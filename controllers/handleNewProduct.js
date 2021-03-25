const Product = require("../models/productModel");

const handleNewProduct = (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-transform");
	res.setHeader("Content-Encoding","identity");
	res.connection.setTimeout(0);
	const productEventEmitter = Product.watch();
	const sendProduct = (data) => {
		const sendData = `data: ${data}\n\n`;
		res.setHeader("Content-length",sendData.length);
		res.write(sendData);
	};
	productEventEmitter.on("change", (change) =>
		sendProduct(JSON.stringify(change))
	);
};

module.exports = handleNewProduct;
