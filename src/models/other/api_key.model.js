const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class ApiKey extends Model {
    static associate(models) {
      // define association here
    }
  }

  ApiKey.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      api_key: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Oops! Api Key cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Api Key cannot be empty'
          }
        }
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active',
        validate: {
          notNull: {
            msg: 'Oops! Status cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Status cannot be empty'
          },
          isIn: {
            args: [['Active', 'Inactive']],
            msg: 'Oops! Status must be Active or Inactive'
          }
        }
      },
      expired_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Expired At cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Expired At cannot be empty'
          },
          isDate: {
            msg: 'Oops! Expired At must be a date'
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
      modelName: 'ApiKey',
      tableName: 'api_key',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return ApiKey
}