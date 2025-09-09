// {GET} /admin/dashboard
const Roles = require("../../models/roles.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Roles.find(find)

  res.render("admin/pages/roles/index", {
        pageTitle: " Trang nhóm quyển",
        records: records
  })
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
        pageTitle: " Trang nhóm quyển",
  })
}

module.exports.createPost = async (req, res) => {
    const records = new Roles(req.body);
    await records.save();
    console.log(records);

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}