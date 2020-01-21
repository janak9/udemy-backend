const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
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
    price: {
        type: Schema.Types.Decimal128,
        required: true
    }
}, {
    collation: "purchases",
    timestamps: true
});

module.exports = mongoose.model("purchases", PurchaseSchema);

