require('module-alias/register')
const response = require('@helpers/http/response')
const LoginService = require('@services/auth/login.service')
const { sequelize } = require('@models')

const login = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const user = await LoginService.checkLoginCredentials(req)
    const accessToken = await LoginService.generateAccessToken(user)
    const refreshToken = await LoginService.generateRefreshToken(user)
    await LoginService.insertAccessTokenAndRefreshToken(
      user,
      accessToken,
      refreshToken,
      t
    )
    await LoginService.updateLastActive(user, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Login Successfully',
      {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    )
  } catch (error) {
    console.log(error)
    await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = { login }