const express = require("express");
const router = express.Router();
const multer = require("multer");
const  uploadClound = require("../../middleware/admin/upload.middleware")

// const storageMulter = require("../../helper/storage")
const upload = multer();

const productsController = require("../../controller/admin/products.controller");
const validate = require("../../validate/admin/products.validate")
router.get('/', productsController.index);
router.get('/create', productsController.create);
router.patch('/change-status/:status/:id', productsController.changeStatus);
router.patch('/change-multi', productsController.changeMulti);
router.delete('/delete/:id', productsController.temporaryDeleteItem);
router.get('/create', productsController.create);
router.post('/create', upload.single('thumbnail'),
    uploadClound.upload,
    validate.createPost, 
    productsController.createPost)
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', upload.single('thumbnail'), validate.createPost, productsController.editPatch);
router.get('/detail/:id', productsController.detail);
module.exports = router;