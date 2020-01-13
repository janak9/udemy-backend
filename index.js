require('dotenv').config({ path: __dirname + '/.env' });
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
const log = console.log;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ exposedHeaders: 'auth_token' }));



mongoose.connect("mongodb://localhost/udemy");
mongoose.connection.on("error", function(error){
    console.log(chalk.red("error occurred while connecting to db "), error);
    process.exit(1);
}).once("open", function(){
    console.log(chalk.green("connection establish successfully"));
});



app.listen(3000, function(error){
    if(error){
        log(chalk.red("An error occured while staring node app!"), error);
        return;
    }
    log("Node application successfully started on " + chalk.blue(process.env['SITE_URL']));
})
