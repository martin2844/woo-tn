const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const logger = require('../../utils/logger')(module);

router.post("/", async (req, res) => {
    let {title, msg, email, name} = req.body
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 587,
            auth: {
               user: process.env.EMAIL,
               pass: process.env.MAILPASS
            }
        });
    
        
        let html = `
        <h1>De: ${name} ${email}</h1>
        <h4>${title}</h4>
        <div>${msg}</div>
        
        
        `
    
        const message = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email || "martin2844@gmail.com", // list of receivers
            subject: `Contacto Via Web: ${name} - ${title}`, // Subject line
            html: html
          });
        logger.info("Contact made");
        res.status(200).send(message)
    } catch (error) {
        logger.error(error);
        res.status(500).send(error)
    }



})

module.exports = router