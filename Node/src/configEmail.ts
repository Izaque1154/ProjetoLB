import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config()

//Configura o transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "ia765350@gmail.com",
        pass: process.env.SENHAEMAIL
    }
})

//Configura a engine handlebars
transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    partialsDir: path.resolve('./emails/templates'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./emails/templates'),
  extName: '.hbs',
}));

export default transporter

