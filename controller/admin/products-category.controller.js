const ProductsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree")
module.exports.index = async (req, res) => {
     let find = {
        deleted: false
    }
  const records = await ProductsCategory.find(find);
  const newRecords = createTreeHelper.tree(records)

  res.render("admin/pages/products-category/index", {
        pageTitle: " Trang danh mục sản phẩm sản phẩm",
        records: newRecords
  })
};

module.exports.create = async (req, res) => {

  let find = {
    deleted: false,
  }
  const records = await ProductsCategory.find(find);
  const newRecords = createTreeHelper.tree(records)

  res.render("admin/pages/products-category/create", {
        pageTitle: " Trang danh mục sản phẩm sản phẩm",
        records: newRecords
  })
};

module.exports.createPost = async (req, res) => {
    if(req.body.position == "" ){
        const productCount = await ProductsCategory.countDocuments();
        req.body.position = productCount + 1;         
    }
    else{
        req.body.position = parseInt(req.body.position); 
    }

    const records = new ProductsCategory(req.body);
    await records.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
