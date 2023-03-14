const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

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

module.exports = router;