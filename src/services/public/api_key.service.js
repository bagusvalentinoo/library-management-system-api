require('module-alias/register')
const response = require('@helpers/http/response')
const { generateRandomCharacter } = require('@helpers/string/string_formatted')
const { ApiKey } = require('@models')

const findApiKey = async (apiKey) => {
  return await ApiKey.findOne({
    where: { api_key: apiKey }
  })
}

const generateApiKey = async (t) => {
  let apiKey = generateRandomCharacter(100)
  let isApiKeyExist = await findApiKey(apiKey)

  while(isApiKeyExist) {
    apiKey = generateRandomCharacter(100)
    isApiKeyExist = await findApiKey(apiKey)
  }

  return await ApiKey.create({
    api_key: apiKey,
    status: 'Active',
    expired_at: new Date(new Date().setDate(new Date().getDate() + 1)), // Expired in 1 day
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
}

module.exports = { generateApiKey }