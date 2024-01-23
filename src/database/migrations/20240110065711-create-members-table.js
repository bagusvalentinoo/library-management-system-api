/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      code: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false
      },
      gender: {
        type: Sequelize.DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false
      },
      phone_number: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      photo_profile_path: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      photo_profile_url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      is_blocked: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_penalized: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      penalty_end_date: {
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
    await queryInterface.dropTable('members')
  }
}
