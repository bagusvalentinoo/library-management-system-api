require('module-alias/register')
const response = require('@helpers/http/response')
const ReturnRule = require('@rules/transaction/return.rule')
const { Borrow, Book, Member, User } = require('@models')

const findBorrowById = async (id) => {
  const borrow = await Borrow.findByPk(id)

  return borrow ? borrow : response.throwNewError(400, 'Oops! Borrow not found')
}

const getReturnById = async (id) => {
  const returnn = await Borrow.findByPk(id, {
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['id', 'code', 'title', 'author']
      },
      {
        model: Member,
        as: 'member',
        attributes: ['id', 'code', 'gender', 'phone_number', 'address', 'is_penalized', 'penalty_end_date'],
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      }
    ]
  })

  return returnn ? returnn : response.throwNewError(400, 'Oops! Borrow is not found')
}

const returnBook = async (req, borrow, t) => {
  const isBookReturnDurationMoreThanSevenDays = ReturnRule.isBookReturnDurationMoreThanSevenDays(borrow.borrow_date)

  if (borrow.is_returned)
    response.throwNewError(400, 'Oops! The book has been returned')

  await borrow.update({
    is_late: isBookReturnDurationMoreThanSevenDays,
    is_returned: true,
    return_date: new Date(),
    updated_at: new Date()
  }, { transaction: t })

  if (isBookReturnDurationMoreThanSevenDays) {
    await Member.update({
      is_penalized: true,
      penalty_end_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days penalty
      updated_at: new Date()
    }, { where: { id: borrow.member_id }, transaction: t })
  }

  return isBookReturnDurationMoreThanSevenDays
    ? 'Successfully returned the book, but you are under penalty 3 days'
    : 'Successfully returned the book'
}

const increaseBookQuantity = async (bookId, t) => {
  const book = await Book.findByPk(bookId)

  return book
    ? await book.update({ quantity: book.quantity + 1 }, { transaction: t })
    : response.throwNewError(400, 'Oops! Something went wrong')
}

module.exports = {
  findBorrowById,
  getReturnById,
  returnBook,
  increaseBookQuantity
}