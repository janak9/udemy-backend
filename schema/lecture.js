const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const LectureSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course_contents',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    video_url: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(! validator.isURL(val)){
                throw new Error("Invalid Video URL...!");
            }
        }
    },
    thumbnail_url: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(! validator.isURL(val)){
                throw new Error("Invalid Thumbnail URL...!");
            }
        }
    }
}, {
    collation: "lectures",
    timestamps: true
});

module.exports = mongoose.model("lectures", LectureSchema);

