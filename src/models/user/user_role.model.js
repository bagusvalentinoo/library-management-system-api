const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class UserRole extends Model {}

  UserRole.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
      timestamps: false
    }
  )

  return UserRole
}