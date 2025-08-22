const express = require("express");
const router = express.Router();

const productsController = require("../../controller/clients/products.controller")
router.get('/', productsController.index);
router.get('/:slug', productsController.detail);

module.exports = router;