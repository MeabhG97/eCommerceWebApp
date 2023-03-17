const router = require(`express`).Router();

const productsModel = require(`../models/products`);

//Get all products
router.get(`/products`, (req, res) => 
{   
    productsModel.find((error, data) => 
    {
        res.json(data);
    })
})

router.get("/products/:id", (req, res) => {
    productsModel.findById(req.params.id, (error, data) => {
        if(data){
            res.json({productName: data.productName, 
                description: data.description, 
                category: data.category,
                productPrice: data.productPrice,
                stock: data.stock
            });
        }
    });
});

// Create a new product (record)
router.post(`/products`, (req, res) => 
{
    productsModel.create(req.body, (error, data) => 
    {
        res.json(data);
    })
})

// Edit a product
router.put(`/products/:id`, (req, res) => 
{
    productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data);
    })        
})

// Delete a product
router.delete(`/products/:id`, (req, res) => 
{
    productsModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data);
    })       
})

module.exports = router;