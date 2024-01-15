require('module-alias/register')
const { Op, ApiKey } = require('@models')

const cleanUpExpiredApiKeys = async () => {
  try {
    const deletedRowsCount = await ApiKey.destroy({
      where: {
        expired_at: {
          [Op.lt]: new Date()
        }
      }
    })

    console.log(`${new Date()} - Deleted ${deletedRowsCount} expired api keys`)
  } catch (error) {
    console.log('Error cleaning up expired api keys: ', error)
  }
}

module.exports = cleanUpExpiredApiKeys