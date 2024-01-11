require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const LoginController = require('@controllers/auth/login.controller')
const UserController = require('@controllers/public/user/user.controller')
const AuthController = require('@controllers/auth/auth.controller')

// Auth Routes
router.post('/auth/refresh-token', ApiKey, async (req, res) => {
  await AuthController.refreshToken(req, res)
})

router.post('/auth/login', ApiKey, async (req, res) => {
  await LoginController.login(req, res)
})

// User Routes
router.get('/users/check-username/:username', ApiKey, async (req, res) => {
  await UserController.checkUsername(req, res)
})

router.get('/users/check-email/:email', ApiKey, async (req, res) => {
  await UserController.checkEmail(req, res)
})

module.exports = router