



const AccountsModel = require("../../models/accounts.model");
const RolesModel =  require("../../models/roles.model");
const paginnationHelper = require("../../helper/pagination")
const systemConfig = require("../../config/system");
const md5 = require("md5")
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    let objPagnation ={
        currentPage : 1,
        limitItem: 4

    }
    const countAccounts=  await AccountsModel.countDocuments(find);
    // const pagination =  paginnationHelper(objPagnation,req.body, countAccounts);
    const records = await AccountsModel.find(find).select("-password -token");

    for(const record of records){
        const role = await RolesModel.findOne({
            _id: record.role_id,
            deleted: false,
        })
        record.role = role
    }
    // console.log(records)
    res.render(`admin/pages/accounts/index`, {
        pageTitle: "Danh sách tài khoản người dùng",
        records: records,
        // pagination: pagination
    })
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await AccountsModel.find(find);

    const roles = await RolesModel.find(find) 
    res.render(`admin/pages/accounts/create`, {
        pageTitle: "Danh sách tài khoản người dùng",
        records: records,
        roles: roles
    })
}

module.exports.createPost = async (req, res) => {
    const emailExist = await AccountsModel.findOne({
        email: req.body.email,
        deleted:false
    })
    if(emailExist){
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back")
    }else{
        req.body.password = md5(req.body.password)
        const record = new AccountsModel(req.body);
        
        await record.save();
    
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}