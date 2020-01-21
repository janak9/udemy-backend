const express = require("express");
const chalk = require("chalk");

const auth = require("./middleware/auth");
const CourseContent = require("../schema/course_content");

const router = express.Router();

router.use(function(req, res, next){
    if(req.method == "GET"){
        return next();
    }
    
    return auth(req, res, next);
});

router.post("/create", async function(req, res){
    try{
        var courseContent = await CourseContent.create(req.body);
        return res.status(201).json(courseContent);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while creating course content");
    }
});

router.get("/list", async function(req, res){
    try{
        var courseContents = await CourseContent.find().populate("course");
        return res.json(courseContents);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving course content list");
    }
});

router.get("/course/:id", async function(req, res){
    try{
        var courseContents = await CourseContent.find({ course: req.params.id }).populate("course");
        return res.json(courseContents);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving course content list");
    }
});

router.get("/:id", async function(req, res){
    try{
        var courseContent = await CourseContent.findById(req.params.id).populate("course");
        return res.json(courseContent);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving course content");
    }
});

router.put("/:id", async function(req, res){
    try{
        var courseContent = await CourseContent.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        return res.json(courseContent);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while updating course content");
    }
});

router.delete("/:id", async function(req, res){
    try{
        var courseContent = await CourseContent.findOneAndDelete({ _id: req.params.id });
        return res.json(courseContent);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while deleteing course content");
    }
});

module.exports = router;