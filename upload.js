const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let subPath = "";
        if(file.fieldname == "profile"){
            subPath = "/profiles";
        }else if(file.fieldname == "video"){
            subPath = "/lectures";
        }else{
            throw new Error("Invalid Fieldname...! Fieldname must be profile or video.");
        }

        file.subPath = subPath;
        dir = "./public" + subPath;
        if(! fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function(req, file, cb){
        let fname = Date.now() + file.originalname.replace(' ', '_');
        file.fullPath = process.env['BASE_URL'] + file.subPath + "/" + fname;
        console.log(file);
        cb(null, fname)
    }
});

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        validateFile(req, file, cb);  
    } 
});

var validateFile = function(req, file, cb){
    if(file.fieldname == "profile"){
        var allowedFileTypes = /jpg|jpeg|png|gif/;
        var fileValidationError = "Invalid file type. Only JPG, JPEG, PNG and GIF file are allowed.";
    }else{
        var allowedFileTypes = /mp4|webm|mpeg|org|avi/;
        var fileValidationError = "Invalid file type. Only MP4, WEBM, MPEG, ORG or AVI file are allowed.";
    }

    let extention = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    let mimeType = allowedFileTypes.test(file.mimetype);
    if(extention && mimeType){
        return cb(null, true);
    }

    req.fileValidationError = fileValidationError
    return cb(null, false, new Error(fileValidationError));

}

module.exports = upload;