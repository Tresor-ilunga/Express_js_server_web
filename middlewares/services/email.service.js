const nodemailer = require('nodemailer');

sendEmail = (req, res, next) =>{
    // envoie du mail
    let transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'testinfos94@gmail.com',
            pass: 'Hello@4166'
        }
    });

    let message = "Email :"+req.body.email+"<br>Message: "+req.body.message;
    let mailOptions ={
        from: req.body.email,
        to: 'testinfos94@gmail.com',
        subject: req.body.subject,
        html: message
    };

    transpoter.sendMail(mailOptions, (err,infos)=>{
        if(err)
        {
            console.log(err);
            res.render('contact',{
                title: "Contact Page",
                error: "Désolé, votre message n'as pas été envoyé."});
                next();
        }else
        {
            console.log(infos);
            res.render('contact',{
                title: "Contact Page", 
                success: "Votre message à été envoyé avec succès."});
                next();
        }
    })
}

module.exports = sendEmail;