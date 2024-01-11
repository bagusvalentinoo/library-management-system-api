const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Admin extends Model {
    static associate(models) {
      // BelongsTo Relationship
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }

  Admin.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
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
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Gender cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Gender cannot be empty'
          },
          isIn: {
            args: [['Male', 'Female', 'Other']],
            msg: 'Oops! Gender must be Male, Female, or Other'
          }
        }
      },
      photo_profile_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Admin
}