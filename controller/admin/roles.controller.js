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

module.exports.edit = async (req, res) => {
    try {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted:false
    }
    const data = await Roles.findOne(find);
    res.render("admin/pages/roles/edit", {
        pageTitle: " Trang nhóm quyển",
        data: data
    })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    await Roles.updateOne({_id: id}, req.body);
    res.redirect(`back`)
}


module.exports.permission = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Roles.find(find);

    res.render("admin/pages/roles/permission", {
        pageTitle: " Trang phân quyển",
        records: records
    })
}

module.exports.permissionPatch = async (req, res) => {
    console.log(req.body);
    const permissions = JSON.parse(req.body.permissions);
    console.log(permissions)
    for (const item of permissions){
        const id = item.id;
        const permission = item.permissions;
        await Roles.updateOne({_id: id}, {permissions: permission})
    }
    req.flash("Cập nhật thành công!")
    res.redirect(`${systemConfig.prefixAdmin}/roles/permission`)
}