require('module-alias/register')
const response = require('@helpers/http/response')
const jwt = require('jsonwebtoken')
const { UserToken } = require('@models')
require('dotenv').config()

const authenticateToken = async (req, res, next) => {
  try {
    const tokenHeader = req.get('Authorization')

    if (!tokenHeader) response.throwNewError(401, 'Oops! You are not authorized to access this resource')

    const tokenBearer = tokenHeader.split(' ')[0]
    const token = tokenHeader.split(' ')[1]

    if (tokenBearer !== 'Bearer') response.throwNewError(401, 'Oops! You are not authorized to access this resource')
    if (!token) response.throwNewError(401, 'Oops! You are not authorized to access this resource')

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
    req.user_id = decoded.id

    const isValidToken = await UserToken.findOne({
      where: { user_id: req.user_id, token: tokenHeader }
    })

    if (!isValidToken) response.throwNewError(401, 'Oops! You are not authorized to access this resource')

    next()
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = authenticateToken