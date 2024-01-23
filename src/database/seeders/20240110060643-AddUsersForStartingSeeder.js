require('module-alias/register')
const bcrypt = require('bcrypt')
const { User } = require('@models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userOfficer = await User.create({
      name: 'Officer',
      username: 'officer',
      email: 'officer@example.com',
      password: bcrypt.hashSync('qwerty12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userOfficer.assignRole('Officer')
    await userOfficer.createOfficer({
      gender: 'Male',
      created_at: new Date(),
      updated_at: new Date()
    })

    const userMember1 = await User.create({
      name: 'Angga Ari Wijaya',
      username: 'angga_ari_wijaya',
      email: 'anggaariwijaya@gmail.com',
      password: bcrypt.hashSync('qwerty12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember1.assignRole('Member')
    await userMember1.createMember({
      code: 'M001',
      gender: 'Male',
      phone_number: '6281234567891',
      address: 'Jl. Lorem Ipsum No.1',
      created_at: new Date(),
      updated_at: new Date()
    })

    const userMember2 = await User.create({
      name: 'Ferry Kurniawan',
      username: 'ferry_kurniawan',
      email: 'ferrykurniawan@gmail.com',
      password: bcrypt.hashSync('qwerty12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember2.assignRole('Member')
    await userMember2.createMember({
      code: 'M002',
      gender: 'Male',
      phone_number: '6282312345678',
      address: 'Jl. Lorem Ipsum No.2',
      created_at: new Date(),
      updated_at: new Date()
    })

    const userMember3 = await User.create({
      name: 'Putri Wulandari',
      username: 'putri_wulandari',
      email: 'putriwulandari@gmail.com',
      password: bcrypt.hashSync('qwerty12345', 10),
      created_at: new Date(),
      updated_at: new Date()
    })
    await userMember3.assignRole('Member')
    await userMember3.createMember({
      code: 'M003',
      gender: 'Female',
      phone_number: '6287898765456',
      address: 'Jl. Lorem Ipsum No.3',
      created_at: new Date(),
      updated_at: new Date()
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profiles', null, {})
    await queryInterface.bulkDelete('user_roles', null, {})
    await queryInterface.bulkDelete('user_tokens', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
};
