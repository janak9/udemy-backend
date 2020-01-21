const express = require("express");
const chalk = require("chalk");
const { getVideoDurationInSeconds } = require('get-video-duration')

const auth = require("./middleware/auth");
const Lecture = require("../schema/lecture");
const upload = require("../upload");

const router = express.Router();

router.use(function(req, res, next){
    if(req.method == "GET"){
        return next();
    }
    
    return auth(req, res, next);
});

router.post("/create", 
    upload.fields([ 
        { name: "video", maxCount: 1 }, 
        { name: "thumbnail", maxCount: 1 } 
    ]), async function(req, res){

    try{
        if(req.fileValidationError){
            return res.status(400).send(req.fileValidationError);
        }

        // console.log(req.files);
        // let dur = await getVideoDurationInSeconds(req.files.video[0].fullPath);
        // console.log("dur : ", dur);
        
        return res.send("test");
        // var lecture = new Lecture(req.body);
        // lecture.video_url
        // return res.status(201).json(lecture);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while creating lecture");
    }
});

router.get("/list", async function(req, res){
    try{
        var lectures = await Lecture.find().populate("course_content");
        return res.json(lectures);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving lecture list");
    }
});

router.get("/course_content/:id", async function(req, res){
    try{
        var lectures = await Lecture.find({ course_content: req.params.id }).populate("course_content");
        return res.json(lectures);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving lecture list");
    }
});

router.get("/:id", async function(req, res){
    try{
        var lecture = await Lecture.findById(req.params.id).populate("course_content");
        return res.json(lecture);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while retriving lecture");
    }
});

router.put("/:id", async function(req, res){
    try{
        var lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true });
        return res.json(lecture);
    }catch(error){
        console.log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while updating lecture");
    }
});

router.delete("/:id", async function(req, res){
    try{
        var lecture = await Lecture.findOneAndDelete({ _id: req.params.id });
        return res.json(lecture);
    }catch(error){
        console.log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while deleteing lecture");
    }
});

module.exports = router;