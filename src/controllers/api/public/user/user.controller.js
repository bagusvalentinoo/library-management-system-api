require('module-alias/register')
const response = require('@helpers/http/response')
const UserService = require('@services/user/user.service')

const checkUsername = async (req, res) => {
  try {
    const isAvailable = await UserService.checkUsernameAvailability(req.params.username)

    return response.success(
      res,
      200,
      'Username Availability',
      {
        is_available: isAvailable
      }
    )
  } catch (error) {
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const checkEmail = async (req, res) => {
  try {
    const isAvailable = await UserService.checkEmailAvailability(req.params.email)

    return response.success(
      res,
      200,
      'Email Availability',
      {
        is_available: isAvailable
      }
    )
  } catch (error) {
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  checkUsername,
  checkEmail
}