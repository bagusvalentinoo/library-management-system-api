require('module-alias/register')
const path = require('path')
const fs = require('fs')
const response = require('@helpers/http/response')
const {
  convertToUpperCase,
  convertToLowerCase
} = require('@helpers/string/string_formatted')
const { getFilePathFromUrl } = require('@helpers/storage/file')
const MemberForListOfficerCollection = require('@resources/user/member/member_for_list_officer_collection')
const { Sequelize, Op, Member, User, UserRole, UserToken } = require('@models')
require('dotenv').config()

const orderByCustom = (query) => {
  const { sort_by, sort_dir } = query
  const validSortDir = ['ASC', 'DESC']
  const normalizedSortDir = validSortDir.includes(convertToUpperCase(sort_dir ?? '')) ? convertToUpperCase(sort_dir) : 'DESC'

  if (sort_by === 'name' || sort_by === 'username' || sort_by === 'email')
    return [['user', convertToLowerCase(sort_by), normalizedSortDir]]

  return sort_by ? [[convertToLowerCase(sort_by), normalizedSortDir]] : [['created_at', 'DESC'], ['updated_at', 'DESC']]
}

const getMembers = async (req) => {
  const query = req.query
  const order = orderByCustom(query)
  const { limit, offset } = response.pagination(query.page, query.limit)
  const { search } = query

  const responsePayloadMember = {
    limit,
    offset,
    order,
    subQuery: false,
    distinct: true,
    attributes: [
      'id',
      'code',
      'phone_number',
      'address',
      'is_penalized',
      'is_blocked',
      'penalty_end_date',
      'photo_profile_url',
      [
        Sequelize.literal(`CAST((
          SELECT COUNT(*)
          FROM "borrows" AS "borrow"
          WHERE "borrow"."member_id" = "Member"."id"
          AND "borrow"."is_returned" = true
        ) AS INTEGER)`),
        'borrowed_books_count'
      ],
      'created_at',
      'updated_at'
    ],
    include: {
      model: User,
      as: 'user',
      attributes: ['name', 'username', 'email']
    }
  }

  if (search) {
    responsePayloadMember.where = {
      ...responsePayloadMember.where,
      [Op.or]: [
        { code: { [Op.iLike]: `%${search}%` } },
        { phone_number: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
        Sequelize.where(
          Sequelize.cast(Sequelize.col('user.name'), 'varchar'),
          { [Op.iLike]: `%${search}%` }
        ),
        Sequelize.where(
          Sequelize.cast(Sequelize.col('user.username'), 'varchar'),
          { [Op.iLike]: `%${search}%` }
        ),
        Sequelize.where(
          Sequelize.cast(Sequelize.col('user.email'), 'varchar'),
          { [Op.iLike]: `%${search}%` }
        )
      ]
    }
  }

  const members = await Member.findAndCountAll(responsePayloadMember)

  return response.paginate(
    members,
    query.page,
    limit,
    'members',
    MemberForListOfficerCollection.collection(members.rows, 1)
  )
}

const findMemberById = async (id) => {
  const member = await Member.findByPk(id)

  return member ? member : response.throwNewError(400, 'Oops! Member not found')
}

const getMemberById = async (id) => {
  const member = await Member.findByPk(id, {
    include: {
      model: User,
      as: 'user',
      attributes: ['name', 'username', 'email']
    }
  })

  return member ? member : response.throwNewError(400, 'Oops! Member not found')
}

const penaltyMember = async (req, member, t) => {
  const { penalty_end_date } = req.body

  if (member.is_penalized)
    response.throwNewError(400, 'Oops! Member is already penalized')

  if (!penalty_end_date)
    response.throwNewError(400, 'Oops! Penalty end date is required')

  const penaltyEndDate = new Date(penalty_end_date)
  const currentDate = new Date()

  if (penaltyEndDate < currentDate)
    response.throwNewError(400, 'Oops! Penalty end date must be greater than current date')

  return await member.update({ is_penalized: true, penalty_end_date }, { transaction: t })
}

const clearPenaltyMember = async (req, member, t) => {
  if (!member.is_penalized)
    response.throwNewError(400, 'Oops! Member is not penalized')

  return await member.update({ is_penalized: false, penalty_end_date: null }, { transaction: t })
}

const blockMember = async (req, member, t) => {
  if (member.is_blocked)
    response.throwNewError(400, 'Oops! Member is already blocked')

  return await member.update({ is_blocked: true }, { transaction: t })
}

const unblockMember = async (req, member, t) => {
  if (!member.is_blocked)
    response.throwNewError(400, 'Oops! Member is not blocked')

  return await member.update({ is_blocked: false }, { transaction: t })
}

const updateProfileMember = async (req, member, t) => {
  const { file_url } = req
  const { name, username, email, gender, phone_number, address } = req.body
  const user = await User.findByPk(member.user_id)
  const oldPhotoProfileUrl = member.photo_profile_url

  const memberUpdated = await member.update({
    gender: gender || member.gender,
    phone_number: phone_number || member.phone_number,
    address: address || member.address,
    photo_profile_url: file_url || null,
    updated_at: new Date()
  }, { transaction: t })

  if (name || username || email) {
    await user.update({
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      updated_at: new Date()
    }, { transaction: t })
  }

  if ((!file_url || file_url) && oldPhotoProfileUrl && oldPhotoProfileUrl !== process.env.DEFAULT_AVATAR_URL) {
    const filePath = path.join(__dirname, `/../../public/${getFilePathFromUrl(oldPhotoProfileUrl)}`)
    fs.unlinkSync(filePath)
  }

  return memberUpdated
}

const deleteMember = async (req, member, t) => {
  await member.destroy({ transaction: t })
  await UserRole.destroy({ where: { user_id: member.user_id }, transaction: t })
  await UserToken.destroy({ where: { user_id: member.user_id }, transaction: t })
  return await User.destroy({ where: { id: member.user_id }, transaction: t })
}

const deleteMembers = async (req, ids, t) => {
  const members = await Member.findAll({
    where: { id: { [Op.in]: ids } }
  })

  if (members.length === 0)
    response.throwNewError(400, 'Oops! Members not found')

  for (const member of members) {
    await deleteMember(req, member, t)
  }

  return true
}

module.exports = {
  getMembers,
  findMemberById,
  getMemberById,
  penaltyMember,
  clearPenaltyMember,
  blockMember,
  unblockMember,
  updateProfileMember,
  deleteMember,
  deleteMembers
}