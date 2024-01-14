require('module-alias/register')
const fs = require('fs')
const response = require('@helpers/http/response')
const { getMemberIdFromUserId } = require('@helpers/model/user')
const MemberService = require('@services/user/member.service')
const MemberForMemberResource = require('@resources/user/member/member_for_member_resource')
const { sequelize } = require('@models')

const show = async (req, res) => {
  try {
    const memberId = await getMemberIdFromUserId(req.user_id)
    const profile = await MemberService.getMemberById(memberId)

    return response.success(
      res,
      200,
      'Data successfully retrieved',
      new MemberForMemberResource(profile),
      'profile'
    )
  } catch (error) {
    console.log(error)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

const update = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const memberId = await getMemberIdFromUserId(req.user_id)
    const findMember = await MemberService.findMemberById(memberId)
    const updatedProfile = await MemberService.updateProfileMember(req, findMember, t)
    await t.commit()
    const profile = await MemberService.getMemberById(updatedProfile.id)

    return response.success(
      res,
      200,
      'Data updated successfully',
      new MemberForMemberResource(profile),
      'profile'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    if (req.file && req.file.path) fs.unlinkSync(req.file.path)
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = {
  show,
  update
}
