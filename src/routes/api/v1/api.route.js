const express = require('express')
const router = express.Router()
const AuthRoute = require('./auth.route')
const PublicRoute = require('./public.route')
const OfficerRoute = require('./officer.route')

// Public Route
router.use('/', PublicRoute)

// Auth Route
router.use('/auth', AuthRoute)

// Officer Route
router.use('/officer', OfficerRoute)

module.exports = router