const express = require("express");
const chalk = require("chalk");
const fs = require('fs');

const auth = require("./middleware/auth");
const isAdmin = require("./middleware/isAdmin");
const Admin = require("../schema/admin");
const upload = require('../upload');

const router = express.Router();

router.use(auth, isAdmin);

router.get("/", async function(req, res){
    try{
        var admin = await Admin.findById(req.admin._id);
        return res.json(admin);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving admin");
    }
});

router.put("/profile_update", upload.single("profile"), async function(req, res){
    try{
        var admin = await Admin.findById(req.admin._id);

        if(req.fileValidationError){
            return res.status(400).send(req.fileValidationError);
        }

        if(admin.profile){
            let loc = admin.profile.replace(process.env['BASE_URL'], 'public');
            fs.unlink(loc);
        }

        admin.profile = req.file.fullPath;
        admin.save();

        return res.json(admin);  
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving admin");
    }
});

module.exports = router;