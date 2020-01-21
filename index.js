require('dotenv').config({ path: __dirname + '/.env' });
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");

const upload = require("./upload");
const jwtHelper = require("./helper/jwtHelper");
const User = require("./schema/user");
// const Admin = require("./schema/admin");

const userRoute = require("./routes/userRoute");
// const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const courseRoute = require("./routes/courseRoute");
const courseContentRoute = require("./routes/courseContentRoute");
const topicRoute = require("./routes/topicRoute");
const lectureRoute = require("./routes/lectureRoute");

const app = express();
const log = console.log;


app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "999mb",extended: true, parameterLimit: 1000000 }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ exposedHeaders: 'auth_token' }));


// database connectivity
mongoose.connect("mongodb://localhost/udemy", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connection.on("error", function(error){
    log(chalk.red("error occurred while connecting to db "), error);
    process.exit(1);
}).once("open", function(){
    log(chalk.green("connection establish successfully"));
});


// API routes
app.use('/user', userRoute);
// app.use('/admin', adminRoute);
app.use('/category', categoryRoute);
app.use('/sub_category', subCategoryRoute);
app.use('/course', courseRoute);
app.use('/course_content', courseContentRoute);
app.use('/topic', topicRoute);
app.use('/lecture', lectureRoute);


app.post("/register", upload.single("profile"), async function(req, res){
    const posted_data = req.body;
    try{
        let updates = Object.keys(posted_data);
        if(updates.includes('isAdmin')){
            return res.status(400).send("Invalid input...! you can not set isAdmin field.");
        }

        let count = await User.countDocuments({ email: posted_data.email });
        if(count > 0){
            return res.status(400).send("email is already registerd!");
        }

        if(req.fileValidationError){
            return res.status(400).send(req.fileValidationError);
        }

        let user = new User(posted_data);
        user.password = await bcrypt.hash(user.password, 8);
        user.profile = req.file.fullPath;
        user.save();

        let token = await jwtHelper.sign({ _id: user._id, isAdmin: user.isAdmin });
        log(chalk.blue(token));
        return res.header({ 'auth_token': token }).json(user);

    }catch(error){
        log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while registering user: " + error.message);
    }
});

app.post("/login", async function(req, res){
    const posted_data = req.body;
    try{
        var user = await User.findOne({ email: posted_data.email });
        if(! user){
            return res.status(404).send("There was a problem logging in. Check your email and password or create an account.")
        }

        if(! bcrypt.compareSync(posted_data.password, user.password)){
            return res.status(404).send("There was a problem logging in. Check your email and password or create an account.")
        }

        let token = await jwtHelper.sign({ _id: user._id, isAdmin: user.isAdmin });
        log(chalk.blue(token));
        return res.header({ 'auth_token': token }).json(user);

    }catch(error){
        log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while login");
    }
});


/*
app.post("/create_admin", upload.single("profile"), async function(req, res){
    const posted_data = req.body;
    try{
        let count = await Admin.countDocuments({ email: posted_data.email });
        if(count > 0){
            return res.status(400).send("email is already registerd!");
        }

        if(req.fileValidationError){
            return res.status(400).send(req.fileValidationError);
        }

        let admin = new Admin(posted_data);
        admin.password = await bcrypt.hash(admin.password, 8);
        admin.profile = req.file.fullPath;
        admin.save();

        let token = await jwtHelper.sign({ _id: admin._id, role: "admin" });
        log(chalk.blue(token));
        return res.header({ 'auth_token': token }).json(admin);

    }catch(error){
        log(chalk.red("error : "), error);
        if(error.name == "ValidationError" || error.name == "MongooseError"){
            return res.status(400).send(error.message);
        }
        return res.status(500).send("an error occured while registering admin: " + error.message);
    }
});

app.post("/admin_login", async function(req, res){
    const posted_data = req.body;
    try{
        var admin = await Admin.findOne({ email: posted_data.email });
        if(! admin){
            return res.status(404).send("There was a problem logging in. Check your email and password or create an account.");
        }

        if(! bcrypt.compareSync(posted_data.password, admin.password)){
            return res.status(404).send("There was a problem logging in. Check your email and password or create an account.");
        }

        let token = await jwtHelper.sign({ _id: admin._id, role: "admin" });
        log(chalk.blue(token));
        return res.header({ 'auth_token': token }).json(admin);

    }catch(error){
        log(chalk.red("error : "), error);
        return res.status(500).send("an error occured while login");
    }
});
*/

app.listen(3002, function(error){
    if(error){
        log(chalk.red("An error occured while staring node app!"), error);
        return;
    }
    log("Node application successfully started on " + chalk.blue(process.env['BASE_URL']));
})
