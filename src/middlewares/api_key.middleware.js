require('module-alias/register')
const { Op, ApiKey } = require('@models')
const response = require('@helpers/http/response')

const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.get('ApiKey')

    if (!apiKey) response.throwNewError(401, 'Oops! ApiKey is required')

    const isApiKeyExists = await ApiKey.findOne({
      where: {
        [Op.and]: [
          { api_key: apiKey },
          { status: 'Active' }
        ]
      }
    })

    if (!isApiKeyExists) response.throwNewError(401, 'Oops! ApiKey is invalid')

    next()
  } catch (error) {
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = validateApiKey