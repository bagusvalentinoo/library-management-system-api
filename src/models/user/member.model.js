const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Member extends Model {
    static associate(models) {
      // HasMany Relationship
      this.hasMany(models.Borrow, {
        foreignKey: 'member_id',
        as: 'borrows'
      })

      // BelongsTo Relationship
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }

  Member.init(
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
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Oops! Code is already exist'
        },
        validate: {
          notNull: {
            msg: 'Oops! Code cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Code cannot be empty'
          },
          max: {
            args: 10,
            msg: 'Oops! Code cannot be more than 10 characters'
          }
        }
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
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Phone number cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Phone number cannot be empty'
          },
          is: {
            args: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            msg: 'Oops! Phone number is invalid'
          }
        }
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Address cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Address cannot be empty'
          }
        }
      },
      photo_profile_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_penalized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      penalty_end_date: {
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
      modelName: 'Member',
      tableName: 'members',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Member
}