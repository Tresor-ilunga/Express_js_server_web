const express = require("express");
const nodemailer = require('nodemailer');
const { Validator } = require('node-input-validator');
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

    // Validation du formulaire 
        const formIsValid = new Validator(req.body, {
            email: 'required|email',
            subject: 'required',
            message: 'required'
        });

        formIsValid.check().then((matched) => {
        if (!matched) {
            res.render('contact', {formError: formIsValid.error})
            //res.status(422).send(formIsValid.errors);
        }
        });


    // envoie du mail
    let transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'testinfos94@gmail.com',
            pass: 'Hello@4166'
        }
    });

    let mailOptions ={
        from: req.body.email,
        to: 'testinfos94@gmail.com',
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