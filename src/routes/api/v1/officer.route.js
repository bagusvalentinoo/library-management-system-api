require('module-alias/register')
const express = require('express')
const router = express.Router()
const ApiKey = require('@middlewares/api_key.middleware')
const Auth = require('@middlewares/auth.middleware')
const { isOfficer: IsOfficer } = require('@middlewares/role.middleware')
const Upload = require('@middlewares/local_storage.middleware')
const BookController = require('@controllers/officer/book/book.controller')

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

module.exports = router