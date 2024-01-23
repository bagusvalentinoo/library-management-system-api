require('module-alias/register')
const fs = require('fs')
const response = require('@helpers/http/response')
const { getOfficerIdFromUserId } = require('@repositories/model/user/user.repository')
const OfficerService = require('@services/user/officer.service')
const OfficerForOfficerResource = require('@resources/user/officer/officer_for_officer_resource')
const { sequelize } = require('@models')

const show = async (req, res) => {
  try {
    const officerId = await getOfficerIdFromUserId(req.user_id)
    const profile = await OfficerService.getOfficerById(officerId)

    return response.success(
      res,
      200,
      'Data successfully retrieved',
      new OfficerForOfficerResource(profile),
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
    const officerId = await getOfficerIdFromUserId(req.user_id)
    const findOfficer = await OfficerService.findOfficerById(officerId)
    const updatedProfile = await OfficerService.updateProfileOfficer(req, findOfficer, t)
    await t.commit()
    const profile = await OfficerService.getOfficerById(updatedProfile.id)

    return response.success(
      res,
      200,
      'Data updated successfully',
      new OfficerForOfficerResource(profile),
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