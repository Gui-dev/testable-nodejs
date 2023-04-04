import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "87d2539a78e49d",
    pass: "13f4c3a87e9f1d"
  }
});