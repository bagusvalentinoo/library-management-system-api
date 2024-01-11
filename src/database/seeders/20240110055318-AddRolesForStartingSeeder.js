require('module-alias/register')
const { Role } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Role.bulkCreate([
      {
        name: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Member',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  }
};
