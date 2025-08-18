const express = require("express");
const router = express.Router();
const multer = require("multer");
const storageMulter = require("../../helper/storage")
const upload = multer({ storage: storageMulter() })

const productsController = require("../../controller/admin/products.controller")
router.get('/', productsController.index);
router.get('/create', productsController.create);
router.patch('/change-status/:status/:id', productsController.changeStatus);
router.patch('/change-multi', productsController.changeMulti);
router.delete('/delete/:id', productsController.temporaryDeleteItem);
router.get('/create', productsController.create);
router.post('/create', upload.single('thumbnail'), productsController.createPost)

module.exports = router;