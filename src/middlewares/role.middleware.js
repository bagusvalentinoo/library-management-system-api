require('module-alias/register')
const response = require('@helpers/http/response')
const { User } = require('@models')

const checkUserRole = (role) => async (req, res, next) => {
  try {
    const { user_id } = req

    if (user_id === undefined) response.throwNewError(403, `Oops! Require ${role} Role`)

    const user = await User.findByPk(user_id)

    if (!user) response.throwNewError(403, `Oops! Require ${role} Role`)

    const roles = await user.getRoles()
    const hasRole = roles.some((userRole) => userRole.name === role)

    if (!hasRole) response.throwNewError(403, `Oops! Require ${role} Role`)

    next()
  } catch (error) {
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  isYourLevelUserHere: checkUserRole('Your Level User Here'),
}