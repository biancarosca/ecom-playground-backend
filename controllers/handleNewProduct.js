const Product = require("../models/productModel");

const handleNewProduct = (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://ecom-playground-frontend.netlify.app"
	);
	const productEventEmitter = Product.watch();
	const sendProduct = (data) => {
		res.write(`data: ${data}\n\n`);
	};
	productEventEmitter.on("change", (change) =>
		sendProduct(JSON.stringify(change))
	);
};

module.exports = handleNewProduct;
