require('module-alias/register')
const { convertToUpperCase, convertToLowerCase } = require('@helpers/string/string_formatted')

const orderBy = (query) => {
  const { sort_by, sort_dir } = query
  const validSortDir = ['ASC', 'DESC']
  const normalizedSortDir = validSortDir.includes(convertToUpperCase(sort_dir ?? '')) ? convertToUpperCase(sort_dir) : 'DESC'

  return sort_by ? [[convertToLowerCase(sort_by), normalizedSortDir]] : [['created_at', 'DESC'], ['updated_at', 'DESC']]
}

module.exports = { orderBy }