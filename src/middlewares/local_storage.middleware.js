require('module-alias/register')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const response = require('@helpers/http/response')
const {
  generateUuidV4,
  getCurrentDateFormatted
} = require('@helpers/string/string_formatted')
require('dotenv').config()

const upload = (folderName, fieldName, isMultiple = false) => (req, res, next) => {
  const destination = path.join(__dirname, `/../public/${folderName ?? 'random'}`)

  if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true })

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, destination)
    },
    filename: (req, file, callback) => {
      const fileName = getCurrentDateFormatted() + '-' + generateUuidV4() + path.extname(file.originalname)
      req.file_url = `${process.env.APP_URL}/${folderName ?? 'random'}/${fileName}`

      callback(null, fileName)
    }
  })

  const fileFilter = (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

    if (!allowedMimeTypes.includes(file.mimetype))
      return callback(new Error('Invalid file type. Only jpg, png image files are allowed.'))

    callback(null, true)
  }

  const upload = isMultiple
    ? multer({
      storage,
      fileFilter,
      limits: {
        fileSize: 3 * 1024 * 1024 // 3 MB (max file size)
      }
    }).array(fieldName, 10)
    : multer({
      storage,
      fileFilter,
      limits: {
        fileSize: 3 * 1024 * 1024 // 3 MB (max file size)
      }
    }).single(fieldName)

  upload(req, res, (error) => {
    if (error)
      return response.failed(res, 400, error)

    next()
  })
}

module.exports = upload