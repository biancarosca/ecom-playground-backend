const Product = require("../models/productModel");

const addProduct = async (req,res) => {
    const product = new Product(req.body);
    try{
		await product.save();
		res.status(201).send({product});
	}catch(error){
		res.status(400).send(error);
	}
}

module.exports = addProduct;