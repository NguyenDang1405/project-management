module.exports.index = (req, res) => {
    res.render("clients/pages/products/index", {
        pagTitle: "Danh sách sản phẩm",
        message:"Đây là trang danh sách sản phẩm"
    })
}