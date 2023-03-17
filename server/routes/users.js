const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const emptyFolder = require("empty-folder");



router.get("/users/all", (req, res) => {
    userModel.find((error, data) => {
        res.json(data);
    });
});

router.post("/users/register/:name/:email/:password", (req, res) => {
    userModel.findOne({email: req.params.email}, (error, data) => {
        if(data){
            res.json({errorMessage: "409: User already exists"});
        }
        else{
            bcrypt.hash(req.params.password, 
                parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (error, hash) => {
                userModel.create({userName: req.params.name,
                    email: req.params.email,
                    passwordHash: hash}, (error, data) => {
                        if(data){
                            res.json({message: "201: user registered", name: data.userName, userID: data._id,
                                email: data.email, accessLevel: data.accessLevel});
                        }
                        else{
                            res.json({errorMessage: "user not registered"});
                        }
                    });
            });
        }
    });
});

router.post("/users/login/:email/:password", (req, res) => {
    userModel.findOne({email: req.params.email}, (error, data) => {
        if(data){
            bcrypt.compare(req.params.password, data.passwordHash, (error, result) => {
                if(result){
                    res.json({name: data.userName, userID: data._id ,accessLevel: data.accessLevel});
                }
                else{
                    res.json({errorMessage: "Incorrect Password"});
                }
            })
        }
        else{
            res.json({errorMessage: "User not found"});
        }
    });
});

router.post("/users/logout", (req, res) => {
    res.json({});
});

router.post("/users/reset", (req, res) => {
    userModel.deleteMany({}, (error, data) => {
        if(data){
            const adminPassword = "Admin";
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (error, hash) => {
                userModel.create({userName: "Admin", email: "admin@admin.com", passwordHash: hash, 
                    accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (error, data) => {
                        if(data){
                            emptyFolder(process.env.UPLOADS, false, (result) => {
                                res.json(data);
                            });
                        }
                        else{
                            res.json({errorMessage: "Admin not created"});
                        }
                    });
            });
        }
    });
});

module.exports = router;