require('module-alias/register')
const { ApiKey } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ApiKey.create({
      api_key: 'p2x190V6IepyIIzl7DPG',
      status: 'Active',
      created_at: new Date(),
      updated_at: new Date()
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('api_key', null, {})
  }
}