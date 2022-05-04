const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();

/* GET home page*/
router.get('/', (req, res)=>{
    res.render('index', {title: "Home Page"});
})

/* GET contact page */
router.get('/contact', (req, res)=>{
    res.render('contact', {title: "Contact Page"});
})

router.post('/contact', (req,res)=>{
    // récupération des données du formulaire
    //console.log(req.body);


    // envoie du mail
    let transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'ti6177854@gmail.com',
            pass: 'Hello@4166'
        }
    });

    let mailOptions ={
        from: req.body.email,
        to: 'ti6177854@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };

    transpoter.sendMail(mailOptions, (err,infos)=>{
        if(err)
        {
            console.log(err);
            res.render('contact',{
                title: "Contact Page",
                error: "Désolé, votre message n'as pas été envoyé."});
        }else
        {
            console.log(infos);
            res.render('contact',{
                title: "Contact Page", 
                success: "Votre message à été envoyé avec succès."});
        }
    })
})

module.exports = router;