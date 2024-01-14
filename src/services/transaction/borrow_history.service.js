require('module-alias/register')
const response = require('@helpers/http/response')
const { getMemberIdFromUserId } = require('@helpers/model/user')
const { Sequelize, Op, Borrow, Book } = require('@models')
const BorrowHistoryForMemberCollection = require('@resources/transaction/borrow_history/borrow_history_for_member_collection')

const getBorrowHistories = async (req) => {
  const query = req.query
  const memberId = await getMemberIdFromUserId(req.user_id)
  const { limit, offset } = response.pagination(query.page, query.limit)
  const { search } = query

  const responsePayloadBorrowHistory = {
    limit,
    offset,
    order: [['return_date', 'DESC']],
    subQuery: false,
    distinct: true,
    where: {
      member_id: memberId,
      is_returned: true
    },
    include: {
      model: Book,
      as: 'book',
      attributes: ['id', 'code', 'title', 'author', 'photo_url']
    }
  }

  if (search) {
    responsePayloadBorrowHistory.where = {
      ...responsePayloadBorrowHistory.where,
      [Op.or]: [
        {
          '$book.code$': {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          '$book.title$': {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          '$book.author$': {
            [Op.iLike]: `%${search}%`
          }
        },
        Sequelize.where(
          Sequelize.cast(Sequelize.col('borrow_date'), 'varchar'),
          { [Op.iLike]: `%${search}%` }
        ),
        Sequelize.where(
          Sequelize.cast(Sequelize.col('return_date'), 'varchar'),
          { [Op.iLike]: `%${search}%` }
        )
      ]
    }
  }

  const borrowHistories = await Borrow.findAndCountAll(responsePayloadBorrowHistory)

  return response.paginate(
    borrowHistories,
    query.page,
    limit,
    'borrow_histories',
    BorrowHistoryForMemberCollection.collection(borrowHistories.rows, 1)
  )
}

module.exports = {
  getBorrowHistories
}