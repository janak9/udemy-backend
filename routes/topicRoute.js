const express = require("express");
const chalk = require("chalk");

const auth = require("./middleware/auth");
const isAdmin = require("./middleware/isAdmin");
const Topic = require("../schema/topic");

const router = express.Router();

router.use(function(req, res, next){
    if(req.method == "GET"){
        return next();
    }
    
    return auth(req, res, () => isAdmin(req, res, next) );
});

router.post("/create", async function(req, res){
    try{
        var topic = await Topic.create(req.body);
        return res.status(201).json(topic);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while creating topic");
    }
});

router.get("/list", async function(req, res){
    try{
        var topics = await Topic.find().populate("sub_category");
        return res.json(topics);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving topic list");
    }
});

router.get("/sub_category/:id", async function(req, res){
    try{
        var topics = await Topic.find({ sub_category: req.params.id }).populate("sub_category");
        return res.json(topics);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving topic list");
    }
});

router.get("/:id", async function(req, res){
    try{
        var topic = await Topic.findById(req.params.id).populate("sub_category");
        return res.json(topic);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving topic");
    }
});

router.put("/:id", async function(req, res){
    try{
        var topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        return res.json(topic);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while updating topic");
    }
});

router.delete("/:id", async function(req, res){
    try{
        var topic = await Topic.findOneAndDelete({ _id: req.params.id });
        return res.json(topic);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while deleteing topic");
    }
});

module.exports = router;