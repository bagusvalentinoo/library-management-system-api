const jwt = require('jsonwebtoken')

const getDateTimeExpiredToken = (tokenBearer) => {
  const token = tokenBearer.split(' ')[1]
  const decoded = jwt.decode(token)

  return decoded && decoded.exp ? new Date(decoded.exp * 1000) : null
}

module.exports = {
  getDateTimeExpiredToken
}