require('module-alias/register')
const response = require('@helpers/http/response')
const BookService = require('@services/product/book.service')
const BookForPublicResource = require('@resources/product/book/book_for_public_resource')

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

const show = async (req, res) => {
  try {
    const book = await BookService.findBookById(req.params.id)

    return response.success(
      res,
      200,
      'Data retrieved successfully',
      new BookForPublicResource(book),
      'book'
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  index,
  show
}