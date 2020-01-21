const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    }
}, {
    collation: "carts",
    timestamps: true
});

module.exports = mongoose.model("carts", CartSchema);

