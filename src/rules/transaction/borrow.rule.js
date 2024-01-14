require('module-alias/register')
const { Member, Book, Borrow } = require('@models')

const isMemberHasBorrowedBookMoreThanTwice = async (memberId) => {
  const borrowCount = await Borrow.count({
    where: {
      member_id: memberId,
      is_returned: false
    }
  })

  return borrowCount >= 2
}

const isMemberIsCurrentlyUnderPenaltyOrBlock = async (memberId) => {
  const member = await Member.findByPk(memberId)

  return member.is_penalized || member.is_blocked
}

const isQuantityOfBorrowedBookIsNotZero = async (bookId) => {
  const book = await Book.findByPk(bookId)

  return book.quantity > 0
}

module.exports = {
  isMemberHasBorrowedBookMoreThanTwice,
  isMemberIsCurrentlyUnderPenaltyOrBlock,
  isQuantityOfBorrowedBookIsNotZero
}