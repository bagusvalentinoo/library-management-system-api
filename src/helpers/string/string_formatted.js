const { v4: uuid4 } = require('uuid')
const crypto = require('crypto')

const convertToUpperCase = (str) => {
  return str.toUpperCase()
}

const convertToLowerCase = (str) => {
  return str.toLowerCase()
}

const generateUuidV4 = () => {
  return uuid4()
}

const generateRandomCharacter = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomCharacter = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length)
    randomCharacter += charset[randomIndex]
  }

  return randomCharacter
}

const generateUsernameFromName = (name) => {
  return name.trim().replace(/\s+/g, '_').toLowerCase()
}

const generateRandomCode = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length)
    code += charset[randomIndex]
  }

  return code
}

const getCurrentDateFormatted = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return day + month + year + hour + minute + second
}

module.exports = {
  convertToUpperCase,
  convertToLowerCase,
  generateUuidV4,
  generateRandomCharacter,
  generateUsernameFromName,
  generateRandomCode,
  getCurrentDateFormatted
}