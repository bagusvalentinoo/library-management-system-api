const { v4: uuid4 } = require('uuid')
const crypto = require('crypto')

const convertToUpperCase = (str) => {
  return str.toUpperCase()
}

const convertToLowerCase = (str) => {
  return str.toLowerCase()
}

const convertToCapitalizedCase = (str) => {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
}

const convertToFormatDateTime = (str) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }

  const dateTime = new Date(str)
  return str ? dateTime.toLocaleDateString('id-ID', options) : null
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
  return name.trim().replace(/\s+/g, '_').toLowerCase() + '_' + generateRandomCharacter(5)
}

const generateRandomPassword = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length)
    password += charset[randomIndex]
  }

  return password
}

module.exports = {
  convertToUpperCase,
  convertToLowerCase,
  convertToCapitalizedCase,
  convertToFormatDateTime,
  generateUuidV4,
  generateRandomCharacter,
  generateUsernameFromName,
  generateRandomPassword
}