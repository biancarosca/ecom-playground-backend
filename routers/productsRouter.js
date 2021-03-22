const express = require("express");
const router = new express.Router();
const getProducts = require("../controllers/getProducts");
const addProduct = require("../controllers/addProduct");
const handleNewProduct = require("../controllers/handleNewProduct");


router.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://ecom-playground-frontend.netlify.app/"
	);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
	next();
});

router.get("/products", getProducts);
router.post("/products", addProduct);
router.get("/new", handleNewProduct);

module.exports = router;
