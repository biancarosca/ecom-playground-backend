const Product = require("../models/productModel");

const handleNewProduct = (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	const productEventEmitter = Product.watch();
	const sendProduct = (data) => {
        res.setHeader(
            "Access-Control-Allow-Origin",
            "*"
        );
		res.write(`data: ${data}\n\n`);
	};
	productEventEmitter.on("change", (change) =>
		sendProduct(JSON.stringify(change))
	);
    
};

module.exports = handleNewProduct;
