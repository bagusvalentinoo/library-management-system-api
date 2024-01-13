/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      code: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      author: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      photo_url: {
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable('books')
  }
}
