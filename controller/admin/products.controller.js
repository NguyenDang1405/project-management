// {GET} /admin/products
const Products = require("../../models/products.models");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination")
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
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
    let objPagination = {
        currentPage: 1,
        limitItem: 4
    }

    const countProducts = await Products.countDocuments(find);
    const pagination = paginationHelper(objPagination,req.query,countProducts);
    const products = await Products.find(find).sort({position: "desc"}).limit(objPagination.limitItem).skip(objPagination.skip);
    
    const newProducts = products.map(item =>{
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item 
    })

  res.render("admin/pages/products/index", {
        pageTitle: " Trang sản phẩm",
        products: newProducts,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination : pagination,
        prefixAdmin: "/admin"
  })
};

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    
    await Products.updateOne({_id: id}, {status: status});
    req.flash("success", "Cập nhật  trạng thái thành công")
    // Lấy referer header và xử lý an toàn
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/products')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/products');
    }
}

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch(type){
        case "active":
            await Products.updateMany({_id:{$in:ids}}, {status:"active"});
            req.flash("success", `Cập nhật  trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "inactive":
            await Products.updateMany({_id:{$in:ids}}, {status:"inactive"})
            req.flash("success", `Cập nhật  trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "deleteAll":
            await Products.updateMany({_id:{$in:ids}}, {deleted: true, deleteAt: new Date()})
            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm`)
            break;
        case "changePosition":
            for(const item of ids ){
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Products.updateMany({_id:id}, {position: position})
           }
           req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm`)
           break;
        default:
            break
    }
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/products')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/products');
    }
}

// module.exports.deleteItem = async (req, res) => {
//     const id = req.params.id;
//     await Products.deleteOne({_id:id});

//     const referer = req.get('Referer');
//     if (referer && referer.includes('/admin/products')) {
//         res.redirect(referer);
//     } else {
//         res.redirect('/admin/products');
//     }
// }

module.exports.temporaryDeleteItem = async (req, res) => {
    const id = req.params.id;
    await Products.updateOne(
        {_id: id}, 
        {
            deleted: true,
            deleteAt: new Date()
        }
    );
    req.flash("success", `Đã xóa thành công`)
    const referer = req.get('Referer');
    if (referer && referer.includes('/admin/products')) {
        res.redirect(referer);
    } else {
        res.redirect('/admin/products');
    }
}

module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: " Trang thêm mới sản phẩm",
        
  })
}

module.exports.createPost = async (req, res) => {

    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == "" ){
        const productCount = await Products.countDocuments();
        req.body.position = productCount + 1;         
    }
    else{
        req.body.position = parseInt(req.body.position); 
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const products = new Products(req.body);
    await products.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

module.exports.edit = async (req, res) => {
    try {
        const find = {
        deleted: false,
        _id: req.params.id
        }

        const product = await Products.findOne(find)
        res.render("admin/pages/products/edit", {
            pageTitle: " Chỉnh sửa sản phẩm",
            product: product
        })
    } catch (error) {
        req.flash("error", `Không tồn tại sản phẩm`)
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}

module.exports.editPatch = async (req, res ) => {
    const id = req.params.id;
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    
    try {
        await Products.updateOne({_id:id}, req.body);
        req.flash("success", `Cập nhật thành công`);
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (error) {
        req.flash("error", `Cập nhật thất bại`);
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }   
}

module.exports.detail = async (req, res) => {
    try {
        const find = {
        deleted: false,
        _id: req.params.id
        }

        const product = await Products.findOne(find)
        res.render("admin/pages/products/detail", {
            pageTitle: product.title ,
            product: product
        })
    } catch (error) {
        req.flash("error", `Không tồn tại sản phẩm`)
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}