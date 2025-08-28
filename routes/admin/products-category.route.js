const express = require("express");
const router = express.Router();
const validate = require("../../validate/admin/products-category.validate")
const multer = require("multer");

const upload = multer();
const  uploadClound = require("../../middleware/admin/upload.middleware")

const productsCategoryController = require("../../controller/admin/products-category.controller");
router.get('/', productsCategoryController.index);
router.get('/create', productsCategoryController.create);
router.post('/create',upload.single('thumbnail'),validate.createPost,uploadClound.upload,productsCategoryController.createPost)
module.exports = router;