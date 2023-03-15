const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const fs = require("fs");
const multer = require("multer");
const upload = multer({dest: `${process.env.UPLOADS}`});
const emptyFolder = require("empty-folder");

//Get all users
router.get("/users/all", (req, res) => {
    userModel.find((error, data) => {
        res.json(data);
    });
});

//Get user with matching id
router.get("/users/one/:id", (req, res) => {
    userModel.findById(req.params.id, (error, data) => {
        if(data){
            if(data.profileImage !== ""){
                fs.readFile(`${process.env.UPLOADS}/${data.profileImage}`, "base64", (error, dataImage) =>{
                    res.json({code: 200, name: data.userName, email: data.email, image: dataImage});
                });
            }
            else{
                res.json({code: 200, name: data.userName, email: data.email, image: data.profileImage});
            }
        }
        else{
            res.json({errorMessage: "User not found"});
        }
    });
});

//Change user image
router.put("/user/image/:id", upload.single("image"), (req, res) => {
    if(!req.file){
        res.json({errorMessage: "No file"});
    }
    else if(req.file.mimetype !== "image/png" && 
        req.file.mimetype !== "image/jpeg" && 
        req.file.mimetype !== "image/jpg"){
            fs.unlink(`${process.env.UPLOADS}/${req.file.filename}`, (error) => {res.json({errorMessage: "Invalide file type"})});
    }
    else{
        userModel.findByIdAndUpdate(req.params.id, {profileImage: req.file.filename}, (error, data) => {
            if(data){
                fs.readFile(`${process.env.UPLOADS}/${req.file.filename}`, "base64", (error, data) =>{
                    res.json({image: data});
                });
            }
            else{
                res.json({errorMessage: "user not found"});
            }
        });
    }
});

//Register new user
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


//Login existing user
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


//Logout current user
router.post("/users/logout", (req, res) => {
    res.json({});
});

module.exports = router;