const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Borrow extends Model {
    static associate(models) {
      // BelongsTo Relationship
      this.belongsTo(models.Member, {
        foreignKey: 'member_id',
        as: 'member'
      })

      this.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book'
      })
    }
  }

  Borrow.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'members',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      book_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      borrow_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Borrow date cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Borrow date cannot be empty'
          },
          isDate: {
            msg: 'Oops! Borrow date must be a date'
          }
        }
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'Oops! Return date must be a date'
          }
        }
      },
      is_late: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            msg: 'Oops! Is late cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Is late cannot be empty'
          },
          isBoolean: {
            msg: 'Oops! Is late must be a boolean'
          }
        }
      },
      is_returned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            msg: 'Oops! Is returned cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Is returned cannot be empty'
          },
          isBoolean: {
            msg: 'Oops! Is returned must be a boolean'
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
      modelName: 'Borrow',
      tableName: 'borrows',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Borrow
}