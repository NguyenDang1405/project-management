// {GET} /admin/products
const Products = require("../../models/products.models");

module.exports. index = async (req, res) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: "active"
        },
        {
            name: "hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;
    }
    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword.trim();
        const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i");
        find.$or = [
            { title: regex },
            { description: regex }
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
        keyword: keyword
  })
}