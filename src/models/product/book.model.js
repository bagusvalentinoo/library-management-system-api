const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      // HasMany Relationship
      this.hasMany(models.Borrow, {
        as: 'borrows',
        foreignKey: 'book_id'
      })
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Oops! Code already exists'
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
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Title cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Title cannot be empty'
          }
        }
      },
      author: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Author cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Author cannot be empty'
          }
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oops! Quantity cannot be empty'
          },
          notEmpty: {
            msg: 'Oops! Quantity cannot be empty'
          },
          isInt: {
            args: true,
            msg: 'Oops! Quantity must be an integer'
          }
        }
      },
      photo_path: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      photo_url: {
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
      modelName: 'Book',
      tableName: 'books',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Book
}