require('module-alias/register')
const response = require('@helpers/http/response')
const AuthService = require('@services/auth/auth.service')
const { sequelize } = require('@models')

const refreshToken = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { access_token, refresh_token } = await AuthService.refreshToken(req, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Refresh Token Successfully',
      {
        access_token,
        refresh_token
      }
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const logout = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    await AuthService.logout(req, t)
    await t.commit()

    return response.success(
      res,
      200,
      'Logout successfully'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  refreshToken,
  logout
}