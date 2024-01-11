const express = require('express')
const router = express.Router()
const AuthRoute = require('./auth.route')
const PublicRoute = require('./public.route')

// Public Route
router.use('/', PublicRoute)

// Auth Route
router.use('/auth', AuthRoute)

module.exports = router