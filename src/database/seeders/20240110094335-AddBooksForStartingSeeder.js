require('module-alias/register')
const { Book } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Book.bulkCreate([
      {
        'code': 'JK-45',
        'title': 'Harry Potter',
        'author': 'J.K Rowling',
        'quantity': 1,
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'code': 'SHR-1',
        'title': 'A Study in Scarlet',
        'author': 'Arthur Conan Doyle',
        'quantity': 1,
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'code': 'TW-11',
        'title': 'Twilight',
        'author': 'Stephenie Meyer',
        'quantity': 1,
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'code': 'HOB-83',
        'title': 'The Hobbit, or There and Back Again',
        'author': 'J.R.R. Tolkien',
        'quantity': 1,
        'created_at': new Date(),
        'updated_at': new Date()
      },
      {
        'code': 'NRN-7',
        'title': 'The Lion, the Witch and the Wardrobe',
        'author': 'C.S. Lewis',
        'quantity': 1,
        'created_at': new Date(),
        'updated_at': new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('borrowed_books', null, {})
    await queryInterface.bulkDelete('books', null, {})
  }
}
