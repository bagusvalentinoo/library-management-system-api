const { Model, DataTypes, Op } = require('sequelize')
const { throwNewError } = require('@helpers/http/response')

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // HasOne Relationships
      this.hasOne(models.Admin, {
        foreignKey: 'user_id',
        as: 'admin'
      })

      this.hasOne(models.Member, {
        foreignKey: 'user_id',
        as: 'member'
      })

      // HasMany Relationship
      this.hasMany(models.UserToken, {
        foreignKey: 'user_id',
        as: 'userTokens'
      })

      // BelongsToMany Relationship
      this.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'roles'
      })
    }

    async assignRole(name, t) {
      const roleNames = Array.isArray(name) ? name : [name]

      const roles = await sequelize.models.Role.findAll({
        where: {
          name: {
            [Op.in]: roleNames
          }
        }
      })

      if (roles.length !== roleNames.length) throwNewError(400, 'Oops! Role not found')

      return await this.setRoles(roles, { transaction: t })
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Name cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Name cannot be empty'
          }
        }
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          msg: 'Oops! Username already exists'
        },
        validate: {
          notNull: {
            msg: 'Oops! Username cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Username cannot be empty'
          },
          len: {
            args: [5, 50],
            msg: 'Oops! Username must be between 5 and 50 characters in length'
          }
        }
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          msg: 'Oops! Email already exists'
        },
        validate: {
          notNull: {
            msg: 'Oops! Email cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Email cannot be empty'
          },
          isEmail: {
            msg: 'Oops! Email must be a valid email address'
          }
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Password cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Password cannot be empty'
          },
          len: {
            args: [8, 255],
            msg: 'Oops! Password must be between 8 and 255 characters in length'
          }
        }
      },
      last_active: {
        type: DataTypes.DATE,
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
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return User
}