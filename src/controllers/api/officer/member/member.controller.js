require('module-alias/register')
const response = require('@helpers/http/response')
const MemberService = require('@services/user/member.service')
const RegisterService = require('@services/auth/register.service')
const EmailService = require('@services/email/email.service')
const WelcomeEmailTemplate = require('@templates/email/welcome.template')
const MemberForMemberResource = require('@resources/user/member/member_for_member_resource')
const MemberForOfficerResource = require('@resources/user/member/member_for_officer_resource')
const { sequelize } = require('@models')

const index = async (req, res) => {
  try {
    const members = await MemberService.getMembers(req)

    return response.success(
      res,
      200,
      'Data retrieved successfully',
      members
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { user, member, password } = await RegisterService.createUserMemberByOfficer(req, t)
    await t.commit()
    await EmailService.sendEmailMessage(
      user.email,
      'Welcome to Library Management System',
      WelcomeEmailTemplate(user.email, user.username, password)
    )
    const memberr = await MemberService.getMemberById(member.id)

    return response.success(
      res,
      201,
      'Data successfully created',
      new MemberForMemberResource(memberr),
      'member'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const show = async (req, res) => {
  try {
    const member = await MemberService.getMemberById(req.params.id)

    return response.success(
      res,
      200,
      'Data retrieved successfully',
      new MemberForOfficerResource(member),
      'member'
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const penaltyMember = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const member = await MemberService.findMemberById(req.params.id)
    await MemberService.penaltyMember(req, member, t)
    await t.commit()

    return response.success(res, 200, 'Successfully penalized member')
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const clearPenaltyMember = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const member = await MemberService.findMemberById(req.params.id)
    await MemberService.clearPenaltyMember(req, member, t)
    await t.commit()

    return response.success(res, 200, 'Successfully cleared member penalty')
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const blockMember = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const member = await MemberService.findMemberById(req.params.id)
    await MemberService.blockMember(req, member, t)
    await t.commit()

    return response.success(res, 200, 'Successfully blocked member')
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const unblockMember = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const member = await MemberService.findMemberById(req.params.id)
    await MemberService.unblockMember(req, member, t)
    await t.commit()

    return response.success(res, 200, 'Successfully unblocked member')
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroySingle = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const member = await MemberService.findMemberById(req.params.id)
    await MemberService.deleteMember(req, member, t)
    await t.commit()

    return response.success(res, 200, 'Successfully deleted member')
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const destroyBulk = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    await MemberService.deleteMembers(req, req.body.ids, t)
    await t.commit()

    return response.success(res, 200, 'Successfully deleted members')
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  index,
  store,
  show,
  penaltyMember,
  clearPenaltyMember,
  blockMember,
  unblockMember,
  destroySingle,
  destroyBulk
}