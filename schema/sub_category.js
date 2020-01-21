const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    collation: "sub_categories",
    timestamps: true
});

module.exports = mongoose.model("sub_categories", SubCategorySchema);

