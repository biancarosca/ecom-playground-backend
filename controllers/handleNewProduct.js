const Product = require("../models/productModel");

const handleNewProduct = (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-transform");
	console.log(res.connection);
	res.setTimeout(600 * 60 * 1000);
	const productEventEmitter = Product.watch();
	const sendProduct = (data) => {
		res.write(`data: ${data}\n\n`);
	};
	productEventEmitter.on("change", (change) =>
		sendProduct(JSON.stringify(change))
	);
	res.write("data:");
};

module.exports = handleNewProduct;
