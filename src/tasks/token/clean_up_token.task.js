require('module-alias/register')
const { Op, UserToken } = require('@models')

const cleanUpExpiredTokens = async () => {
  try {
    const deletedRowsCount = await UserToken.destroy({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { type: 'Access' },
              { type: 'Refresh' }
            ]
          },
          {
            expired_at: {
              [Op.lt]: new Date()
            }
          }
        ]
      }
    })

    console.log(`${new Date()} - Deleted ${deletedRowsCount} expired tokens`)
  } catch (error) {
    console.log('Error cleaning up expired tokens: ', error)
  }
}

module.exports = cleanUpExpiredTokens