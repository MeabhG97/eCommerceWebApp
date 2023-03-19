const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

const fs = require("fs");
const multer = require("multer");
const upload = multer({dest: `${process.env.UPLOAD_USER}`});
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
                fs.readFile(`${process.env.UPLOAD_USER}/${data.profileImage}`, "base64", (error, dataImage) =>{
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

//Get User Image
router.get("/user/get/image/:filename", (req, res) => {
    fs.readFile(`${process.env.UPLOAD_USER}/${req.params.filename}`, "base64", (error, data) => {
        if(data){
            res.json({image: data});
        }
        else{
            res.json({errorMessage: "Not found", image: null});
        }
    });
});

//Change user image
router.put("/user/image/:id", upload.single("image"), (req, res) => {
    if(!req.file){
        res.json({errorMessage: "No file"});
    }
    else if(req.file.mimetype !== "image/png" && 
        req.file.mimetype !== "image/jpeg"){
            fs.unlink(`${process.env.UPLOAD_USER}/${req.file.filename}`, (error) => {res.json({errorMessage: "Invalide file type"})});
    }
    else{
        userModel.findByIdAndUpdate(req.params.id, {profileImage: req.file.filename}, (error, data) => {
            if(data){
                fs.readFile(`${process.env.UPLOAD_USER}/${req.file.filename}`, "base64", (error, data) =>{
                    res.json({image: data});
                });
            }
            else{
                res.json({errorMessage: "user not found"});
            }
        });
    }
});

//New Purchase
router.put("/user/purchase/:id/:paypalId/:products", (req, res) => {
    userModel.findByIdAndUpdate(req.params.id,
        {$push: {purchases: {paypayID: req.params.paypalId, products: JSON.parse(req.params.products)}}}, 
        {returnDocument:'after'}, (error, data) => {
            if(data){
                res.json(data);
            }
            else{
                res.json({errorMessage: "Purchase not added"});
            }
        });
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
                    res.json({name: data.userName, userID: data._id, accessLevel: data.accessLevel});
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

//User Database Reset
router.post("/users/reset", (req, res) => {
    userModel.deleteMany({}, (error, data) => {
        if(data){
            const adminPassword = "Admin";
            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (error, hash) => {
                userModel.create({userName: "Admin", email: "admin@admin.com", passwordHash: hash, 
                    accessLevel: parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (error, data) => {
                        if(data){
                            emptyFolder(process.env.UPLOAD_USER, false, (result) => {
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

router.delete("/user/delete/:id", (req, res) => {
    userModel.findByIdAndDelete(req.params.id, (error, data) =>{
        res.json(data);
    });
});

module.exports = router;