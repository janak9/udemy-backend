const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    sub_category: {
        type: Schema.Types.ObjectId,
        ref: 'sub_categories',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }
}, {
    collation: "topics",
    timestamps: true
});

module.exports = mongoose.model("topics", TopicSchema);

