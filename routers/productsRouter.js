const express = require("express");
const router = new express.Router();
const getProducts = require("../controllers/getProducts");
const addProduct = require("../controllers/addProduct");
const handleNewProduct = require("../controllers/handleNewProduct");

router.get("/products", getProducts);
router.post("/products", addProduct);
router.get("/new", handleNewProduct);

module.exports = router;
