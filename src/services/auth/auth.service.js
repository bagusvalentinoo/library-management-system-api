require('module-alias/register')
const response = require('@helpers/http/response')
const { getDateTimeExpiredToken } = require('@helpers/date/date_time')
const jwt = require('jsonwebtoken')
const { Op, UserToken } = require('@models')
require('dotenv').config()

const refreshToken = async (req, t) => {
  const { refresh_token } = req.body

  if (!refresh_token) response.throwNewError(400, 'Oops! Token is not valid')

  const tokenOnly = refresh_token.split(' ')[1]

  const decoded = jwt.verify(tokenOnly, process.env.JWT_REFRESH_TOKEN_SECRET)
  const user_id = decoded.id

  const userRefreshToken = await UserToken.findOne({
    where: {
      [Op.and]: [
        { user_id: user_id },
        { type: 'Refresh' },
        { token: refresh_token }
      ]
    }
  })

  if (!userRefreshToken) response.throwNewError(400, 'Oops! Token is not valid')

  const userNewRefreshToken = 'Bearer ' + jwt.sign(
    { id: user_id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED }
  )
  const userNewRefreshTokenExpired = getDateTimeExpiredToken(userNewRefreshToken)

  const userNewAccessToken = 'Bearer ' + jwt.sign(
    { id: user_id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED }
  )
  const userNewAccessTokenExpired = getDateTimeExpiredToken(userNewAccessToken)

  userRefreshToken.token = userNewRefreshToken
  userRefreshToken.expired_at = userNewRefreshTokenExpired
  await userRefreshToken.save({ transaction: t })

  await UserToken.create({
    user_id: user_id,
    type: 'Access',
    token: userNewAccessToken,
    expired_at: userNewAccessTokenExpired
  }, { transaction: t })

  return {
    access_token: userNewAccessToken,
    refresh_token: userNewRefreshToken
  }
}

const logout = async (req, t) => {
  const { user_id } = req
  const { access_token, refresh_token } = req.body

  if (!access_token || !refresh_token) response.throwNewError(400, 'Oops! Token is not valid')

  const userTokenDeleted = await UserToken.destroy({
    where: {
      [Op.and]: [
        { user_id: user_id },
        {
          [Op.or]: [
            { token: access_token },
            { token: refresh_token }
          ]
        }
      ]
    }
  }, { transaction: t })

  if (!userTokenDeleted) response.throwNewError(400, 'Oops! Token is not valid')

  return true
}

module.exports = {
  refreshToken,
  logout
}