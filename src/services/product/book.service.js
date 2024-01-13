require('module-alias/register')
const fs = require('fs')
const path = require('path')
const response = require('@helpers/http/response')
const { orderBy } = require('@helpers/model/query')
const { getFilePathFromUrl } = require('@helpers/storage/file')
const BookForListOfficerCollection = require('@resources/product/book/book_for_list_officer_collection')
const { Sequelize, Op, Book } = require('@models')

const getBooks = async (req) => {
  const query = req.query
  const order = orderBy(query)
  const { limit, offset } = response.pagination(query.page, query.limit)
  const { search } = query

  const responsePayloadBook = {
    limit,
    offset,
    order,
    subQuery: false,
    distinct: true
  }

  if (search) {
    responsePayloadBook.where = {
      ...responsePayloadBook.where,
      [Op.or]: [
        { code: { [Op.iLike]: `%${search}%` } },
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } },
        Sequelize.where(
          Sequelize.cast(Sequelize.col('quantity'), 'varchar'),
          { [Op.iLike]: `%${search}%` }
        )
      ]
    }
  }

  const books = await Book.findAndCountAll(responsePayloadBook)

  return response.paginate(
    books,
    query.page,
    limit,
    'books',
    BookForListOfficerCollection.collection(books.rows, 1)
  )
}

const createBook = async (req, t) => {
  const { file_url } = req
  const { code, title, author, quantity } = req.body

  return await Book.create({
    code,
    title,
    author,
    quantity,
    photo_url: file_url ?? null
  }, { transaction: t })
}

const findBookById = async (id) => {
  const book = await Book.findByPk(id)

  return book ? book : response.throwNewError(400, 'Oops! Book not found')
}

const updateBook = async (req, book, t) => {
  const { file_url } = req
  const { code, title, author, quantity } = req.body

  const bookUpdated = await book.update({
    code: code ?? book.code,
    title: title ?? book.title,
    author: author ?? book.author,
    quantity: quantity ?? book.quantity,
    photo_url: file_url,
    updated_at: new Date()
  }, { transaction: t })

  if (!file_url) {
    if (book.photo_url) {
      const filePath = path.join(__dirname, `/../../../public/${getFilePathFromUrl(book.photo_url)}`)
      fs.unlinkSync(filePath)
      await book.update({ photo_url: null }, { transaction: t })
    }
  }

  return bookUpdated
}

const deleteBook = async (req, book, t) => {
  if (book.photo_url) {
    const filePath = path.join(__dirname, `/../../../public/${getFilePathFromUrl(book.photo_url)}`)
    fs.unlinkSync(filePath)
  }

  await book.destroy({ transaction: t })
}

const deleteBooks = async (req, ids, t) => {
  const books = await Book.findAll({
    where: {
      id: { [Op.in]: ids }
    }
  })

  if (books.length === 0) response.throwNewError(400, 'Oops! Books not found')

  for (const book of books) {
    await deleteBook(req, book, t)
  }

  return true
}

module.exports = {
  getBooks,
  createBook,
  findBookById,
  updateBook,
  deleteBook,
  deleteBooks
}