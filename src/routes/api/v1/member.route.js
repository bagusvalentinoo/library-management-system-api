require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const { isMember: IsMember } = require('@middlewares/role.middleware')
const Upload = require('@middlewares/local_storage.middleware')
const BorrowController = require('@controllers/member/transaction/borrow/borrow.controller')
const ReturnController = require('@controllers/member/transaction/return/return.controller')
const BorrowHistoryController = require('@controllers/member/transaction/borrow_history/borrow_history.controller')
const ProfileController = require('@controllers/member/profile/profile.controller')

router.post('/borrow', ApiKey, Auth, IsMember, async (req, res) => {
  await BorrowController.store(req, res)
})

router.post('/return', ApiKey, Auth, IsMember, async (req, res) => {
  await ReturnController.store(req, res)
})

router.get('/borrow-history', ApiKey, Auth, IsMember, async (req, res) => {
  await BorrowHistoryController.index(req, res)
})

router.get('/profile', ApiKey, Auth, IsMember, async (req, res) => {
  await ProfileController.show(req, res)
})

router.put('/profile', ApiKey, Auth, IsMember, Upload('/images/user/member/profile', 'photo_profile'), async (req, res) => {
  await ProfileController.update(req, res)
})

module.exports = router