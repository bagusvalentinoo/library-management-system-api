require('module-alias/register')
const response = require('@helpers/http/response')
const { generateRandomCharacter } = require('@helpers/string/string_formatted')
const { ApiKey } = require('@models')

const generateApiKey = async (t) => {
  return await ApiKey.create({
    api_key: generateRandomCharacter(20),
    status: 'Active',
    expired_at: new Date(new Date().setDate(new Date().getDate() + 1)), // Expired in 1 day
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
}

module.exports = { generateApiKey }