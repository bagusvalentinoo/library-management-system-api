require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const LoginController = require('@controllers/auth/login.controller')
const RegisterController = require('@controllers/auth/register.controller')
const AuthController = require('@controllers/auth/auth.controller')

// Auth Routes
router.post('/login', ApiKey, async (req, res) => {
  await LoginController.login(req, res)
})

router.post('/register', ApiKey, async (req, res) => {
  await RegisterController.store(req, res)
})

router.post('/refresh-token', ApiKey, async (req, res) => {
  await AuthController.refreshToken(req, res)
})

router.post('/logout', ApiKey, Auth, async (req, res) => {
  await AuthController.logout(req, res)
})

module.exports = router