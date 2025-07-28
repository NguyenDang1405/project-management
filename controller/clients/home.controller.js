// {GET} /
module.exports.index = (req, res) => {
  res.render("clients/pages/home/index", {
        pageTitle: " Trang chủ",
        message: " Đây là trang chủ!"
  })
}