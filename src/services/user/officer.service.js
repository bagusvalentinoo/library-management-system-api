require('module-alias/register')
const path = require('path')
const fs = require('fs')
const response = require('@helpers/http/response')
const { getFilePathFromUrl } = require('@helpers/storage/file')
const { Officer, User } = require('@models')
require('dotenv').config()

const findOfficerById = async (id) => {
  const officer = await Officer.findByPk(id)

  return officer ? officer : response.throwNewError(400, 'Oops! Officer not found')
}

const getOfficerById = async (id) => {
  const officer = await Officer.findByPk(id, {
    include: {
      model: User,
      as: 'user',
      attributes: ['name', 'username', 'email']
    }
  })

  return officer ? officer : response.throwNewError(400, 'Oops! Officer not found')
}

const updateProfileOfficer = async (req, officer, t) => {
  const { file_url } = req
  const { name, username, email, gender } = req.body
  const user = await User.findByPk(officer.user_id)
  const oldPhotoProfileUrl = officer.photo_profile_url

  const officerUpdated = await officer.update({
    gender: gender || officer.gender,
    photo_profile_url: file_url || null,
    updated_at: new Date()
  }, { transaction: t })

  if (name || username || email) {
    await user.update({
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      updated_at: new Date()
    }, { transaction: t })
  }

  if ((!file_url || file_url) && oldPhotoProfileUrl && oldPhotoProfileUrl !== process.env.DEFAULT_AVATAR_URL) {
    const filePath = path.join(__dirname, `/../../public/${getFilePathFromUrl(oldPhotoProfileUrl)}`)
    fs.unlinkSync(filePath)
  }

  return officerUpdated
}

module.exports = {
  findOfficerById,
  getOfficerById,
  updateProfileOfficer
}