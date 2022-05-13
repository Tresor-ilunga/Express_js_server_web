const express = require("express");
const nodemailer = require('nodemailer');
const contactValidator = require('../middlewares/validators/contact.validator');
const sendEmail = require('../middlewares/services/email.service')
const router = express.Router();

/* GET home page*/
router.get('/', (req, res)=>{
    res.render('index', {title: "Home Page"});
})

/* GET contact page */
router.get('/contact', (req, res)=>{
    res.render('contact', {title: "Contact Page"});
})

router.post('/contact', contactValidator, sendEmail)

module.exports = router;