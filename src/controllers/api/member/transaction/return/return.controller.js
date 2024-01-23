require('module-alias/register')
const response = require('@helpers/http/response')
const ReturnService = require('@services/transaction/return.service')
const ReturnForMemberResource = require('@resources/transaction/return/return_for_member_resource')
const { sequelize } = require('@models')

const update = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const borrow = await ReturnService.findBorrowById(req.body.borrow_id)
    const message = await ReturnService.returnBook(req, borrow, t)
    await ReturnService.increaseBookQuantity(borrow.book_id, t)
    await t.commit()
    const borrowedBook = await ReturnService.getReturnById(borrow.id)

    return response.success(
      res,
      200,
      message,
      new ReturnForMemberResource(borrowedBook),
      'return'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = { update }