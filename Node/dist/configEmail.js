"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Configura o transporter
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "ia765350@gmail.com",
        pass: process.env.SENHAEMAIL
    }
});
//Configura a engine handlebars
transporter.use('compile', (0, nodemailer_express_handlebars_1.default)({
    viewEngine: {
        extname: '.hbs',
        partialsDir: path_1.default.resolve('./emails/templates'),
        defaultLayout: false,
    },
    viewPath: path_1.default.resolve('./emails/templates'),
    extName: '.hbs',
}));
exports.default = transporter;
