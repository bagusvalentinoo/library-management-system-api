require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const AuthController = require('@controllers/auth/auth.controller')

router.post('/logout', ApiKey, Auth, async (req, res) => {
  await AuthController.logout(req, res)
})

module.exports = router