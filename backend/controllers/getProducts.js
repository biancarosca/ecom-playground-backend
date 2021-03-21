const Product = require("../models/productModel");

const getProducts = async (req,res) => {
    const products = await Product.find({});
    if(!products)
       return res.status(404).send();

    return res.send(products);
}

module.exports = getProducts;