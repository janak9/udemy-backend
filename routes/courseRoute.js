const express = require("express");
const chalk = require("chalk");

const auth = require("./middleware/auth");
const Course = require("../schema/course");

const router = express.Router();

router.use(function(req, res, next){
    if(req.method == "GET"){
        return next();
    }
    
    return auth(req, res, next);
});

router.post("/create", async function(req, res){
    try{
        var posted_data = req.body;
        posted_data.created_by = req.user._id;

        var course = await Course.create(posted_data);
        return res.status(201).json(course);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while creating course");
    }
});

router.get("/list", async function(req, res){
    try{
        var courses = await Course.find().populate("topic").populate("created_by");
        return res.json(courses);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving course list");
    }
});

router.get("/topic/:id", async function(req, res){
    try{
        var courses = await Course.find({ topic: req.params.id }).populate("topic").populate("created_by");
        return res.json(courses);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving course list");
    }
});

router.get("/:id", async function(req, res){
    try{
        var course = await Course.findById(req.params.id).populate("topic").populate("created_by");
        return res.json(course);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving course");
    }
});

router.put("/:id", async function(req, res){
    try{
        let posted_data = req.body;
        let updates = Object.keys(posted_data);
        let allowedUpdates = ['topic', 'title', 'description', 'languages', 'learn_topic', 'price'];
        let isAllowed = updates.every( (field) => allowedUpdates.includes(field) );

        if(! isAllowed){
            return res.status(400).send("Invalid update...! you can only update following fields: ", allowedUpdates);
        }

        var course = await Course.findByIdAndUpdate(req.params.id, posted_data, {new: true, runValidators: true });
        return res.json(course);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while updating course");
    }
});

router.delete("/:id", async function(req, res){
    try{
        var course = await Course.findOneAndDelete({ _id: req.params.id });
        return res.json(course);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while deleteing course");
    }
});

module.exports = router;