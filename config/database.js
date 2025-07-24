const mongoose = require("mongoose");
module.exports.connect = async () => {
    try {
        await  mongoose.connect(process.env.mongoose_URL);
        console.log("Success!")
    } catch (error) {
        console.log("connect error!")
    }
}