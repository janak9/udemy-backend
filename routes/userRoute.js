const express = require("express");
const chalk = require("chalk");
const fs = require('fs');

const auth = require("./middleware/auth");
const User = require("../schema/user");
const upload = require('../upload');

const router = express.Router();

router.use(auth);

router.get("/", async function(req, res){
    try{
        var user = await User.findById(req.user._id);
        return res.json(user);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving user");
    }
});

router.put("/profile_update", upload.single("profile"), async function(req, res){
    try{
        var user = await User.findById(req.user._id);

        if(req.fileValidationError){
            return res.status(400).send(req.fileValidationError);
        }

        if(user.profile){
            let loc = user.profile.replace(process.env['BASE_URL'], 'public');
            fs.unlink(loc);
        }

        user.profile = req.file.fullPath;
        user.save();

        return res.json(user);  
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving user");
    }
});

module.exports = router;