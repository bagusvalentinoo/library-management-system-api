require('module-alias/register')
const response = require('@helpers/http/response')
const RegisterService = require('@services/auth/register.service')
const LoginService = require('@services/auth/login.service')
const MemberService = require('@services/user/member.service')
const MemberForMemberResource = require('@resources/user/member/member_for_member_resource')
const { sequelize } = require('@models')

const store = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { user, member } = await RegisterService.createUserMember(req, t)
    const accessToken = await LoginService.generateAccessToken(user)
    const refreshToken = await LoginService.generateRefreshToken(user)
    await LoginService.insertAccessTokenAndRefreshToken(
      user,
      accessToken,
      refreshToken,
      t
    )
    await t.commit()
    const memberr = await MemberService.getMemberById(member.id)

    return response.success(
      res,
      201,
      'Data successfully created',
      {
        member: new MemberForMemberResource(memberr),
        access_token: accessToken,
        refresh_token: refreshToken
      }
    )
  } catch (error) {
    console.log(error)
    if (t) await t.rollback()
    return response.failed(res, error.status_code ?? 500, error)
  }
}

module.exports = { store }