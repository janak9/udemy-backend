const express = require("express");
const chalk = require("chalk");

const User = require("../schema/user");
const jwtHelper = require("../helper/jwtHelper");

const router = express.Router();

router.use(async function(req, res, next){
    const token = req.headers.auth_token;
    if(token){
        var decoded_data = await jwtHelper.verify(token);
        if(decoded_data.error){
            return res.status(401).send('Invalid Token!');
        }
        console.log(decoded_data);
        req.user = decoded_data.data;
        return next();
    }
    return res.status(400).send("please pass required token");
});

router.get("/", async function(req, res){
    try{
        var user = await User.findById(req.user._id);
        return res.json(user);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving user");
    }
});

// router.put("")

module.exports = router;