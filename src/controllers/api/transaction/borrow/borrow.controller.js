require('module-alias/register')
const response = require('@helpers/http/response')
const BorrowService = require('@services/transaction/borrow.service')
const BorrowForMemberResource = require('@resources/transaction/borrow/borrow_for_member_resource')
const { sequelize } = require('@models')

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const bookBorrowed = await BorrowService.borrowBook(req, t)
    await BorrowService.reduceBookQuantity(bookBorrowed.book_id, t)
    await t.commit()
    const borrow = await BorrowService.getBorrowById(bookBorrowed.id)

    return response.success(
      res,
      201,
      'Book borrowed successfully',
      new BorrowForMemberResource(borrow),
      'borrow'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  store
}