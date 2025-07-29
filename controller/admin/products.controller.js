// {GET} /admin/products
const Products = require("../../models/products.models");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search")
module.exports. index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;
    };
    
    const objSearch = searchHelper(req.query);
    
    if(objSearch.regex){
        find.$or = [
            { title: objSearch.regex },
            { description: objSearch.regex }
        ];
    }
    const products = await Products.find(find)

    const newProducts = products.map(item =>{
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item 
    })

  res.render("admin/pages/products/index", {
        pageTitle: " Trang sản phẩm",
        products: newProducts,
        filterStatus: filterStatus,
        keyword: objSearch.keyword
  })
}