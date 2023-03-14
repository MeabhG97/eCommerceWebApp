const router = require("express").Router();
const userModel = require("../models/users");

router.get("/all-users", (req, res) => {
    userModel.find((error, data) => {
        res.json(data);
    });
});
