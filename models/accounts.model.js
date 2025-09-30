const mongoose = require('mongoose');
const generate = require("../helper/generate")

const accountsSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted:{
        type:Boolean,
        default:false,
    },
    deleteBy:{
        account_id:String,
        deletedAt:Date
    },
    updatedBy:[
        {
            account_id:String,
            updatedAt:Date
        }
    ]
},
)
const Accounts = mongoose.model('Accounts', accountsSchema ,'accounts')
module.exports = Accounts