const express = require("express");
const router = express.Router();

const productsController = require("../../controller/admin/products.controller")
router.get('/', productsController.index);
router.patch('/change-status/:status/:id', productsController.changeStatus);
router.patch('/change-multi', productsController.changeMulti);
router.delete('/delete/:id', productsController.deleteItem);

module.exports = router;