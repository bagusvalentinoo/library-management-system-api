require('module-alias/register')
const response = require('@helpers/http/response')
const { getDateTimeExpiredToken } = require('@helpers/date/date_time')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Op, User } = require('@models')
require('dotenv').config()

const checkLoginCredentials = async (req) => {
  const { username, password } = req.body

  if (!username || !password)
    response.throwNewError(400, 'Oops! Fill all required fields')

  const user = await User.findOne({
    where: {
      [Op.or]: [
        { username: username },
        { email: username }
      ]
    }
  })

  if (!user)
    response.throwNewError(400, 'Oops! Username, or Email, and Password didn\'t match')
  if (!bcrypt.compareSync(password, user.password))
    response.throwNewError(400, 'Oops! Username, or Email, and Password didn\'t match')

  return user
}

const generateAccessToken = async (user) => {
  return 'Bearer ' + jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED })
}

const generateRefreshToken = async (user) => {
  return 'Bearer ' + jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED })
}

const insertAccessTokenAndRefreshToken = async (user, accessToken, refreshToken, t) => {
  const accessTokenExpired = getDateTimeExpiredToken(accessToken)
  const refreshTokenExpired = getDateTimeExpiredToken(refreshToken)

  await user.createUserToken({
    type: 'Access',
    token: accessToken,
    expired_at: accessTokenExpired,
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })

  return await user.createUserToken({
    type: 'Refresh',
    token: refreshToken,
    expired_at: refreshTokenExpired,
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
}

const updateLastActive = async (user, t) => {
  return await user.update({ last_active: new Date() }, { transaction: t })
}

module.exports = {
  checkLoginCredentials,
  generateAccessToken,
  generateRefreshToken,
  insertAccessTokenAndRefreshToken,
  updateLastActive
}