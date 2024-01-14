require('module-alias/register')
const response = require('@helpers/http/response')
const { getMemberIdFromUserId } = require('@helpers/model/user')
const BorrowRule = require('@rules/transaction/borrow.rule')
const { Borrow, Book, Member, User } = require('@models')

const getBorrowById = async (id) => {
  const borrow = await Borrow.findByPk(id, {
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['id', 'code', 'title', 'author']
      },
      {
        model: Member,
        as: 'member',
        attributes: ['id', 'code', 'gender', 'phone_number', 'address'],
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      }
    ]
  })

  return borrow ? borrow : response.throwNewError(400, 'Oops! Borrow is not found')
}

const borrowBook = async (req, t) => {
  const { book_id } = req.body
  const memberId = await getMemberIdFromUserId(req.user_id)

  if (!book_id)
    response.throwNewError(400, 'Oops! You must choose one of the books')

  const isBookIdExist = await Book.findByPk(book_id)

  if (!isBookIdExist)
    response.throwNewError(400, 'Oops! The book is not found')

  const isMemberHasBorrowedBookMoreThanTwice = await BorrowRule.isMemberHasBorrowedBookMoreThanTwice(memberId)
  const isMemberIsCurrentlyUnderPenaltyOrBlock = await BorrowRule.isMemberIsCurrentlyUnderPenaltyOrBlock(memberId)
  const isQuantityOfBorrowedBookIsNotZero = await BorrowRule.isQuantityOfBorrowedBookIsNotZero(book_id)

  if (!memberId)
    response.throwNewError(400, 'Oops! Something went wrong')

  if (isMemberHasBorrowedBookMoreThanTwice)
    response.throwNewError(400, 'Oops! You have borrowed more than 2 books')

  if (isMemberIsCurrentlyUnderPenaltyOrBlock)
    response.throwNewError(400, 'Oops! You are currently under penalty or block')

  if (!isQuantityOfBorrowedBookIsNotZero)
    response.throwNewError(400, 'Oops! The book is currently unavailable')

  return await Borrow.create({
    member_id: memberId,
    book_id,
    borrow_date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
}

const reduceBookQuantity = async (bookId, t) => {
  const book = await Book.findByPk(bookId)

  return book
    ? await book.update({ quantity: book.quantity - 1 }, { transaction: t })
    : response.throwNewError(400, 'Oops! Something went wrong')
}

module.exports = {
  getBorrowById,
  borrowBook,
  reduceBookQuantity
}