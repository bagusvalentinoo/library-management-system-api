require('module-alias/register')
const response = require('@helpers/http/response')
const { Op, User } = require('@models')

const checkUsernameAvailability = async (username) => {
  const isUsernameLengthValid = username.length >= 5 && username.length <= 50

  if (!isUsernameLengthValid) response.throwNewError(400, 'Oops! Username length must be between 5 and 50 characters')

  const user = await User.findOne({
    where: {
      username: {
        [Op.eq]: username
      }
    }
  })

  return !user
}

const checkEmailAvailability = async (email) => {
  const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/

  if (!regex.test(email)) response.throwNewError(400, 'Oops! Invalid email format')

  const user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email
      }
    }
  })

  return !user
}

module.exports = {
  checkUsernameAvailability,
  checkEmailAvailability
}