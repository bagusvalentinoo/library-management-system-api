require('module-alias/register')
const { Member, Officer } = require('@models')

const getMemberIdFromUserId = async (userId) => {
  const member = await Member.findOne({
    where: { user_id: userId }
  })

  return member.id
}

const getOfficerIdFromUserId = async (userId) => {
const officer = await Officer.findOne({
    where: { user_id: userId }
  })

  return officer.id
}

module.exports = {
  getMemberIdFromUserId,
  getOfficerIdFromUserId
}