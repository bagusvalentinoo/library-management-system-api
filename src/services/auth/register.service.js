require('module-alias/register')
const response = require('@helpers/http/response')
const { generateRandomCode } = require('@helpers/string/string_formatted')
const bcrypt = require('bcrypt')
const { User, Member } = require('@models')
require('dotenv').config()

const createUserMember = async (req, t) => {
  const {
    name,
    email,
    username,
    password,
    password_confirmation,
    gender,
    phone_number,
    address
  } = req.body

  if (!password)
    response.throwNewError(400, 'Oops! Fill all required fields')

  if (password !== password_confirmation)
    response.throwNewError(400, 'Oops! Password confirmation does not match')

  let code = generateRandomCode(3)
  const isCodeExist = await Member.findOne({ where: { code } })

  while (isCodeExist) {
    code = generateRandomCode(3)
  }

  const newUserMember = await User.create({
    name,
    email,
    username,
    password: bcrypt.hashSync(password, 10),
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
  await newUserMember.assignRole('Member', t)

  return await newUserMember.createMember({
    code,
    gender,
    phone_number,
    address,
    photo_profile_url: process.env.DEFAULT_AVATAR_URL,
    created_at: new Date(),
    updated_at: new Date()
  }, { transaction: t })
}

module.exports = { createUserMember }