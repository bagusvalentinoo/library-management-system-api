require('module-alias/register')
const fs = require('fs')
const response = require('@helpers/http/response')
const BookService = require('@services/product/book.service')
const BookForOfficerResource = require('@resources/product/book/book_for_officer_resource')
const { sequelize } = require('@models')

const index = async (req, res) => {
  try {
    const books = await BookService.getBooks(req)

    return response.success(
      res,
      200,
      'Data retrieved successfully',
      books
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const book = await BookService.createBook(req, t)
    await t.commit()

    return response.success(
      res,
      201,
      'Data created successfully',
      new BookForOfficerResource(book),
      'book'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    if (req.file && req.file.path) fs.unlinkSync(req.file.path)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const show = async (req, res) => {
  try {
    const book = await BookService.findBookById(req.params.id)

    return response.success(
      res,
      200,
      'Data retrieved successfully',
      new BookForOfficerResource(book),
      'book'
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const update = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const findBook = await BookService.findBookById(req.params.id)
    const bookUpdated = await BookService.updateBook(req, findBook, t)
    await t.commit()
    const book = await BookService.findBookById(bookUpdated.id)

    return response.success(
      res,
      200,
      'Data updated successfully',
      new BookForOfficerResource(book),
      'book'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    if (req.file && req.file.path) fs.unlinkSync(req.file.path)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroySingle = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const book = await BookService.findBookById(req.params.id)
    await BookService.deleteBook(req, book, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Data deleted successfully'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroyBulk = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    await BookService.deleteBooks(req, req.body.ids, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Data deleted successfully'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroySingle,
  destroyBulk
}