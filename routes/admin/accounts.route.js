const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const  uploadClound = require("../../middleware/admin/upload.middleware")
const validate = require("../../validate/admin/account.validate")

const accountController = require("../../controller/admin/accounts.controller");
router.get("/", accountController.index)
router.get("/create", accountController.create )
router.post("/create",upload.single('thumbnail'),validate.createPost,uploadClound.upload, accountController.createPost )
module.exports = router;