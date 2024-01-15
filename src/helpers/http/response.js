const { ValidationError } = require('sequelize')

const success = (res, status_code, message, data, param = null) => {
  const responsePayload = {
    status_code: status_code,
    message: message
  }

  if (data) responsePayload.data = data
  if (responsePayload.data) param ? responsePayload.data = { [param]: responsePayload.data } : responsePayload.data

  return res.status(status_code).json(responsePayload)
}

const throwNewError = (status_code, message) => {
  const error = new Error(message)
  error.status_code = status_code

  throw error
}

const failed = (res, status_code, error) => {
  const responsePayload = {
    status_code: status_code,
    message: error.message ?? error
  }

  if (error instanceof ValidationError) {
    responsePayload.status_code = 422
    responsePayload.message = error.errors[0].message
  }

  return res.status(status_code).json(responsePayload)
}

const pagination = (page, size) => {
  const limit = size ? +size : 10
  const offset = page ? (page - 1) * limit : 0

  return { limit, offset }
}

const paginate = (model, page, limit, dataKey, resource) => {
  return {
    [dataKey]: resource,
    pagination: {
      total_item: model.count,
      total_page: Math.ceil(model.count / limit),
      current_page: parseInt(page),
      next_page: parseInt(page) + 1,
      prev_page: parseInt(page) - 1,
      limit: parseInt(limit)
    }
  }
}

module.exports = {
  success,
  throwNewError,
  failed,
  pagination,
  paginate
}