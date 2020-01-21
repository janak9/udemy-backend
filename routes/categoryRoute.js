const express = require("express");
const chalk = require("chalk");

const auth = require("./middleware/auth");
const isAdmin = require("./middleware/isAdmin");
const Category = require("../schema/category");

const router = express.Router();

router.use(function(req, res, next){
    if(req.method == "GET"){
        return next();
    }
    
    return auth(req, res, () => isAdmin(req, res, next) );
});

router.post("/create", async function(req, res){
    try{
        var category = await Category.create(req.body);
        return res.status(201).json(category);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while creating category");
    }
});

router.get("/list", async function(req, res){
    try{
        var categories = await Category.find();
        return res.json(categories);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving category list");
    }
});

router.get("/:id", async function(req, res){
    try{
        var category = await Category.findById(req.params.id);
        return res.json(category);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving category");
    }
});

router.put("/:id", async function(req, res){
    try{
        var category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        return res.json(category);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while updating category");
    }
});

router.delete("/:id", async function(req, res){
    try{
        var category = await Category.findOneAndDelete({ _id: req.params.id });
        return res.json(category);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while deleteing category");
    }
});

module.exports = router;