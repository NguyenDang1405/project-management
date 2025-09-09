const ProductsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductsCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/products-category/index", {
    pageTitle: " Trang danh mục sản phẩm sản phẩm",
    records: newRecords,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductsCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: " Trang danh mục sản phẩm sản phẩm",
    records: newRecords,
  });
};

module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const productCount = await ProductsCategory.countDocuments();
    req.body.position = productCount + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const records = new ProductsCategory(req.body);
  await records.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

module.exports.edit = async (req, res) => {
    let find={
          deleted:false
      }
    const data = await ProductsCategory.find(find);
    const newdata = createTreeHelper.tree(data);
  try {
    const id = req.params.id;
    const records = await ProductsCategory.findOne({
      _id: id,
      deleted: false,
    });
    console.log(newdata)

    res.render("admin/pages/products-category/edit", {
      pageTitle: " Trang danh mục sản phẩm sản phẩm",
      records: records,
      data: newdata,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.postion = parseInt(req.body.postion);
  try {
    await Products.updateOne({ _id: id }, req.body);
    req.flash("success", `Cập nhật thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } catch (error) {
    req.flash("error", `Cập nhật thất bại`);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
