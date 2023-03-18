const router = require(`express`).Router();

const productsModel = require(`../models/products`);

const fs = require("fs");
const multer = require("multer");
const upload = multer({dest: `${process.env.UPLOAD_PRODUCT}`});

//Get all products
router.get(`/products`, (req, res) => 
{   
    productsModel.find((error, data) => 
    {
        res.json(data);
    })
})

//Get product by id
router.get("/products/:id", (req, res) => {
    productsModel.findById(req.params.id, (error, data) => {
        if(data){
            res.json({productName: data.productName, 
                description: data.description, 
                category: data.category,
                productPrice: data.productPrice,
                stock: data.stock,
                images: data.images
            });
        }
    });
});

//Get Image
router.get("/products/image/:filename", (req, res) => {
    fs.readFile(`${process.env.UPLOAD_PRODUCT}/${req.params.filename}`, "base64", (error, data) => {
        if(data){
            res.json({image: data});
        }
        else{
            res.json({image: null});
        }
    });
});

// Create a new product (record)
router.post(`/products/new/:name/:description/:category/:price/:stock/:images`, (req, res) => {
   productsModel.create({
        productName: req.params.name,
        description: req.params.description,
        category: req.params.category,
        productPrice: req.params.price,
        stock: req.params.stock,
        images: req.params.images
   }, (error, data) => {
        if(data){
            res.json({code: 200});
        }
        else{
            res.json({errorMessage:"Product not created"});
        }
   });
})

// Edit a product
router.put(`/products/:id`, (req, res) => 
{
    productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data);
    })        
})

//Add Image for new Product
router.put("/product/new-image", upload.single("image"), (req, res) => {
    if(!req.file){
        res.json({errorMessage: "No file uploaded"});
    }
    else if(req.file.mimetype !== "image/png" && 
        req.file.mimetype !== "image/jpeg"){
            fs.unlink(`${process.env.UPLOAD_PRODUCT}/${req.file.filename}`, (error) => {
                res.json({errorMessage: "Invalide file type"});
            });
    }
    else{
        res.json({filename: req.file.filename});
    }
});

//Add new Image
router.put("/product/add-image/:id", upload.single("image"), (req, res) => {
    if(!req.file){
        res.json({errorMessage: "No file uploaded"});
    }
    else if(req.file.mimetype !== "image/png" && 
        req.file.mimetype !== "image/jpeg"){
            fs.unlink(`${process.env.UPLOAD_PRODUCT}/${req.file.filename}`, (error) => {
                res.json({errorMessage: "Invalide file type"});
            });
    }
    else{
        productsModel.findByIdAndUpdate(req.params.id, {$push: {images: req.file.filename}}, 
            {returnDocument:'after'}, (error, data) =>{
            if(data){
                console.log(data.images);
                res.json({images: data.images});            
            }
            else{
                res.json({errorMessage: "File not uploaded"});
            }
        });
    }
});

// Delete a product
router.delete(`/products/:id`, (req, res) => 
{
    productsModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data);
    })       
})

module.exports = router;