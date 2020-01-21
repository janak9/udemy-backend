const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(! /^[a-zA-Z ]{3,}$/.test(val)){
                throw new Error("Invalid First Name. First Name must contain at least 3 character...!");
            }
        }
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(! /^[a-zA-Z ]{3,}$/.test(val)){
                throw new Error("Invalid Last Name. Last Name must contain at least 3 character...!");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(val){
            if(! validator.isEmail(val)){
                throw new Error("Invalid Email...!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(! /^.{8,}$/.test(val)){
                throw new Error("Invalid Password. Password must contain 8 character...!");
            }
        }
    },
    profile: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    headline: {
        type: String,
        trim: true
    },
    biography: {
        type: String,
        trim: true
    },
    Website: {
        type: String,
        trim: true,
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Invalid URL...!")
            }
        }
    },
    twitter: {
        type: String,
        trim: true,
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Invalid URL...!")
            }
        }
    },
    facebook: {
        type: String,
        trim: true,
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Invalid URL...!")
            }
        }
    },
    linkedin: {
        type: String,
        trim: true,
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Invalid URL...!")
            }
        }
    },
    youtube: {
        type: String,
        trim: true,
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Invalid URL...!")
            }
        }
    }
}, {
    collation: "users",
    timestamps: true
});

module.exports = mongoose.model("users", UserSchema);

