const mongoose = require("mongoose");
const productSchema = require("./products");

let purchasesSchema = new mongoose.Schema(
    {
        date: {type: Date, default: Date.now},
        products: [{id: {type: String}, quantity:{type: Number}}],
        paypalID: {type: String}
    }
);

let userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true},
        email: {type: String, required: true},
        passwordHash: {type: String, required: true},
        profileImage: {type: String, default: ""},
        purchases: [purchasesSchema],
        accessLevel: {type: Number, default: parseInt(process.env.ACCESS_LEVEL_USER)}
    },
    {
        collection: "user"
    }
);

module.exports = mongoose.model("user", userSchema);
