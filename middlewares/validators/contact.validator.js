const { Validator } = require('node-input-validator');

contactValidator = (req, res, next) =>{
    // Validation du formulaire 
    const formIsValid = new Validator(req.body, {
        email: 'required|email',
        subject: 'required',
        message: 'required'
    });

    formIsValid.check().then((matched) => {
    if (!matched) {
        res.render('contact', {formError: formIsValid.error})
        return;
    }
    next();
    });
}

module.exports = contactValidator;