const express = require('express')
const router = express.Router()
const AuthRoute = require('./auth.route')
const PublicRoute = require('./public.route')
const OfficerRoute = require('./officer.route')
const MemberRoute = require('./member.route')

// Public Route
router.use('/', PublicRoute)

// Auth Route
router.use('/auth', AuthRoute)

// Officer Route
router.use('/officer', OfficerRoute)

// Member Route
router.use('/member', MemberRoute)

module.exports = router