/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false
      },
      username: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false
      },
      last_active: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
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
    await queryInterface.dropTable('users')
  }
}