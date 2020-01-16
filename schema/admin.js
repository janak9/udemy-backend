const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
        trim: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    collation: "admins",
    timestamps: true
});

module.exports = mongoose.model("admins", AdminSchema);

