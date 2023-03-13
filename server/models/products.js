const mongoose = require(`mongoose`);

let productsSchema = new mongoose.Schema(
    {
        productName:{type: String},
        description:{type: String},
        category:{type: String},
        productPrice:{type: Number},
        stock:{type: Number}
        
    },{
        collection: `products`
    }

)

module.exports = mongoose.model(`products`, productsSchema);