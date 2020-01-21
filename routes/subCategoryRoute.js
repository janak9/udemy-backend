const express = require("express");
const chalk = require("chalk");

const auth = require("./middleware/auth");
const isAdmin = require("./middleware/isAdmin");
const SubCategory = require("../schema/sub_category");

const router = express.Router();

router.use(function(req, res, next){
    if(req.method == "GET"){
        return next();
    }
    
    return auth(req, res, () => isAdmin(req, res, next) );
});

router.post("/create", async function(req, res){
    try{
        var subCategory = await SubCategory.create(req.body);
        return res.status(201).json(subCategory);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while creating subCategory");
    }
});

router.get("/list", async function(req, res){
    try{
        var subCategories = await SubCategory.find().populate("category");
        return res.json(subCategories);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving subCategory list");
    }
});

router.get("/category/:id", async function(req, res){
    try{
        var subCategories = await SubCategory.find({ category: req.params.id }).populate("category");
        return res.json(subCategories);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving subCategory list");
    }
});

router.get("/:id", async function(req, res){
    try{
        var subCategory = await SubCategory.findById(req.params.id).populate("category");
        return res.json(subCategory);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving subCategory");
    }
});

router.put("/:id", async function(req, res){
    try{
        var subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        return res.json(subCategory);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while updating subCategory");
    }
});

router.delete("/:id", async function(req, res){
    try{
        var subCategory = await SubCategory.findOneAndDelete({ _id: req.params.id });
        return res.json(subCategory);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while deleteing subCategory");
    }
});

module.exports = router;