require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const UserController = require('@controllers/public/user/user.controller')

// User Routes
router.get('/users/check-username/:username', ApiKey, async (req, res) => {
  await UserController.checkUsername(req, res)
})

router.get('/users/check-email/:email', ApiKey, async (req, res) => {
  await UserController.checkEmail(req, res)
})

module.exports = router