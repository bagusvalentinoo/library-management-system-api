require('module-alias/register')
const response = require('@helpers/http/response')
const RegisterService = require('@services/auth/register.service')
const MemberService = require('@services/user/member.service')
const MemberForMemberResource = require('@resources/user/member/member_for_member_resource')
const { sequelize } = require('@models')

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const newUserMember = await RegisterService.createUserMember(req, t)
    await t.commit()
    const member = await MemberService.getMemberById(newUserMember.id)

    return response.success(
      res,
      201,
      'Data successfully created',
      new MemberForMemberResource(member),
      'member'
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = { store }