const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    }
}, {
    collation: "carts",
    timestamps: true
});

module.exports = mongoose.model("carts", CartSchema);

