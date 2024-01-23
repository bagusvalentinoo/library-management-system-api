require('module-alias/register')
const { Officer, Member } = require('@models')

const getOfficerIdFromUserId = async (userId) => {
  const officer = await Officer.findOne({
    where: { user_id: userId }
  })

  return officer.id
}

const getMemberIdFromUserId = async (userId) => {
  const member = await Member.findOne({
    where: { user_id: userId }
  })

  return member.id
}

module.exports = {
  getOfficerIdFromUserId,
  getMemberIdFromUserId
}