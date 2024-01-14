require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const { isMember: IsMember } = require('@middlewares/role.middleware')
const BorrowController = require('@controllers/transaction/borrow/borrow.controller')
const ReturnController = require('@controllers/transaction/return/return.controller')
const BorrowHistoryController = require('@controllers/transaction/borrow_history/borrow_history.controller')

router.post('/borrow', ApiKey, Auth, IsMember, async (req, res) => {
  await BorrowController.store(req, res)
})

router.post('/return', ApiKey, Auth, IsMember, async (req, res) => {
  await ReturnController.store(req, res)
})

router.get('/borrow-history', ApiKey, Auth, IsMember, async (req, res) => {
  await BorrowHistoryController.index(req, res)
})

module.exports = router