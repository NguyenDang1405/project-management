// {GET} /admin/products
const Products = require("../../models/products.models");

module.exports.index = async (req, res) => {
    const products = await Products.find({
        deleted: false
    })

    console.log(products)
    const newProducts = products.map(item =>{
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item 
    })

  res.render("admin/pages/products/index", {
        pageTitle: " Trang sản phẩm",
        products: newProducts
  })
}