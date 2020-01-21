const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseContentSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collation: "course_contents",
    timestamps: true
});

module.exports = mongoose.model("course_contents", CourseContentSchema);

