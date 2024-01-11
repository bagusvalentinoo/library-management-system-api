const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class UserToken extends Model {
    static associate (models) {
      // BelongsTo Relationship
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }

  UserToken.init(
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
      type: {
        type: DataTypes.ENUM('Access', 'Refresh'),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Token Type cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Token Type cannot be empty'
          },
          isIn: {
            args: [['Access', 'Refresh']],
            msg: 'Oops! Token Type must be Access or Refresh'
          }
        }
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Token cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Token cannot be empty'
          }
        }
      },
      expired_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Token Expired At cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Token Expired At cannot be empty'
          }
        }
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
      modelName: 'UserToken',
      tableName: 'user_tokens',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return UserToken
}