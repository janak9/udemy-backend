/*
var FormData = require('form-data');
const fs = require("fs");
const axios = require("axios");

var formData = new FormData();   
formData.append('video', fs.createReadStream('./public/lectures/video/001_Course_Introduction.mp4'));
formData.append('thumbnail', fs.createReadStream('./public/lectures/thumbnail/1579607920617download_(1).jpg'));

const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded), // TO SHOW UPLOAD STATUS
    headers: {
        'auth_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2YTYzNGVhNGQ5MDE2OTRjZDJmNjkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1Nzk1OTEzNDAsImV4cCI6MTU3OTc2NDE0MH0.RqGuEEuHXcupwP6NgD9KvPVZGyjA5hvDfG5dwjLioI0"
    },
    'maxContentLength': Infinity,
    'maxBodyLength': Infinity
};

axios.post("http://localhost:3002/lecture/create", formData, config)
.then((response) => {
    // do whatever you want
    console.log(response.data);

}).catch((error) => {
    console.log(error)
});
  
*/
var progress = require('progress-stream');
var fs = require('fs');
var filename = "./public/lectures/video/15796079173611_ReactJS.mp4";
var stat = fs.statSync(filename);
var str = progress({
    length: stat.size,
    time: 100 /* ms */
});
 
str.on('progress', function(progress) {
    console.log(progress);
 
    /*
    {
        percentage: 9.05,
        transferred: 949624,
        length: 10485760,
        remaining: 9536136,
        eta: 42,
        runtime: 3,
        delta: 295396,
        speed: 949624
    }
    */
});
 
fs.createReadStream(filename)
    .pipe(str)
    .pipe(fs.createWriteStream("test.data"));