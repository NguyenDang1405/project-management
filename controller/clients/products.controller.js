// {GET} /products
const Products = require("../../models/products.models")
module.exports.index = async (req, res) => {
    const products = await Products.find({
        status: "active",
        deleted: false
    });
    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })

    res.render("clients/pages/products/index", {
        pagTitle: "Danh sách sản phẩm",
        products: newProducts
    })
}

module.exports.detail = async (req, res) => {
    try {
        const find = {
        deleted: false,
        slug: req.params.slug,
        status: "active"
        }

        const product = await Products.findOne(find)
        res.render("clients/pages/products/detail", {
            pageTitle: product.title ,
            product: product
        })
    } catch (error) {
        req.flash("error", `Không tồn tại sản phẩm`)
        res.redirect(`/products`);
    }

}