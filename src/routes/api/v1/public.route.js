require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const UserController = require('@controllers/public/user/user.controller')
const BookController = require('@controllers/public/book/book.controller')

// User Routes
router.get('/users/check-username/:username', ApiKey, async (req, res) => {
  await UserController.checkUsername(req, res)
})

router.get('/users/check-email/:email', ApiKey, async (req, res) => {
  await UserController.checkEmail(req, res)
})

// Book Routes
router.get('/books', ApiKey, async (req, res) => {
  await BookController.index(req, res)
})

router.get('/books/:id', ApiKey, async (req, res) => {
  await BookController.show(req, res)
})

module.exports = router