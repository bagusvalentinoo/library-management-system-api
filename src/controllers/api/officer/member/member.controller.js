require('module-alias/register')
const response = require('@helpers/http/response')
const MemberService = require('@services/user/member.service')
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

module.exports = {
  index,
  show,
  penaltyMember,
  clearPenaltyMember,
  blockMember,
  unblockMember
}