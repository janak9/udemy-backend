const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'topics',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    languages: {
        type: Array,
        required: true,
    },
    learn_topic: {
        type: Array,
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
        validate(val){
            if(val < 0){
                throw new Error("Price must be positive...!");
            }
        }
    }
}, {
    collation: "courses",
    timestamps: true
});

module.exports = mongoose.model("courses", CourseSchema);

