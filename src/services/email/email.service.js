const nodemailer = require('nodemailer')
const htmlToText = require('nodemailer-html-to-text').htmlToText
require('dotenv').config()

const sendEmailMessage = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: {
      name: process.env.MAIL_FROM_NAME,
      address: process.env.MAIL_FROM_ADDRESS
    },
    replyTo: `noreply.${process.env.MAIL_FROM_ADDRESS}`,
    to: to,
    subject: subject,
    html: html
  }

  transporter.use('compile', htmlToText())
  await transporter.sendMail(mailOptions)
}

module.exports = { sendEmailMessage }