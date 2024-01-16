require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const { isOfficer: IsOfficer } = require('@middlewares/role.middleware')
const Upload = require('@middlewares/local_storage.middleware')
const BookController = require('@controllers/officer/book/book.controller')
const MemberController = require('@controllers/officer/member/member.controller')
const ProfileController = require('@controllers/officer/profile/profile.controller')

// Book routes
router.get('/books', ApiKey, Auth, IsOfficer, async (req, res) => {
  await BookController.index(req, res)
})

router.post('/books', ApiKey, Auth, IsOfficer, Upload('/images/product/book', 'photo'), async (req, res) => {
  await BookController.store(req, res)
})

router.get('/books/:id', ApiKey, Auth, IsOfficer, async (req, res) => {
  await BookController.show(req, res)
})

router.put('/books/:id', ApiKey, Auth, IsOfficer, Upload('/images/product/book', 'photo'), async (req, res) => {
  await BookController.update(req, res)
})

router.delete('/books/:id', ApiKey, Auth, IsOfficer, async (req, res) => {
  await BookController.destroySingle(req, res)
})

router.delete('/books', ApiKey, Auth, IsOfficer, async (req, res) => {
  await BookController.destroyBulk(req, res)
})

// Member routes
router.get('/members', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.index(req, res)
})

router.post('/members', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.store(req, res)
})

router.get('/members/:id', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.show(req, res)
})

router.put('/members/:id/penalty', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.penaltyMember(req, res)
})

router.put('/members/:id/clear-penalty', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.clearPenaltyMember(req, res)
})

router.put('/members/:id/block', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.blockMember(req, res)
})

router.put('/members/:id/unblock', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.unblockMember(req, res)
})

router.delete('/members/:id', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.destroySingle(req, res)
})

router.delete('/members', ApiKey, Auth, IsOfficer, async (req, res) => {
  await MemberController.destroyBulk(req, res)
})

// Profile Routes

router.get('/profile', ApiKey, Auth, IsOfficer, async (req, res) => {
  await ProfileController.show(req, res)
})

router.put('/profile', ApiKey, Auth, IsOfficer, Upload('/images/user/officer/profile', 'photo_profile'), async (req, res) => {
  await ProfileController.update(req, res)
})

module.exports = router