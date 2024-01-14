require('module-alias/register')
const response = require('@helpers/http/response')
const BorrowHistoryService = require('@services/transaction/borrow_history.service')

const index = async (req, res) => {
  try {
    const borrowHistories = await BorrowHistoryService.getBorrowHistories(req)

    return response.success(
      res,
      200,
      'Data retrieved successfully',
      borrowHistories
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const show = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  index,
  show
}