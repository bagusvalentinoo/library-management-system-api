/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('api_key', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      api_key: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
      },
      expired_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('api_key')
  }
}