require('module-alias/register')
const response = require('@helpers/http/response')
const ApiKeyService = require('@services/public/api_key.service')
const ApiKeyForResource = require('@resources/other/api-key/api_key_for_resource')
const { sequelize } = require('@models')

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const apiKey = await ApiKeyService.generateApiKey(t)
    await t.commit()

    return response.success(
      res,
      201,
      'Data created successfully',
      new ApiKeyForResource(apiKey)
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = { store }