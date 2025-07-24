module.exports.index = (req, res) => {
    res.render("clients/pages/products/index", {
        title: "Danh sách sản phẩm",
        message:"Đây là trang danh sách sản phẩm"
    })
}