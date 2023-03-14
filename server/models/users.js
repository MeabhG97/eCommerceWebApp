const mongoose = require("mongoose");
const productSchema = require("./products");

let purchasesSchema = new mongoose.Schema(
    {
        date: {type: Date, required: true, default: Date.now},
        products: [productSchema._id]
    }
);

let userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true},
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        profileImage: {type: String, default: ""},
        purchases: [purchasesSchema]
    },
    {
        collection: "user"
    }
);

module.exports = mongoose.model("user", userSchema);
