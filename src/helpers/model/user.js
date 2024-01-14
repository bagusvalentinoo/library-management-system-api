require('module-alias/register')
const { Member } = require('@models')

const getMemberIdFromUserId = async (userId) => {
  const member = await Member.findOne({
    where: { user_id: userId }
  })

  return member.id
}

module.exports = {
  getMemberIdFromUserId
}