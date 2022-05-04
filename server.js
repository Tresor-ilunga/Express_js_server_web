const { Router } = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index.route');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set("views", "templates");
app.set("view engine", "twig");
app.use(express.static('public'));
app.use((req,res,next)=>{
    req.message = "Message middleware";
    
    next();
})

app.use('/', indexRouter);

app.listen(port, () =>{
    console.log(`Exemple app listening at http://localhost:${port}`)
})

