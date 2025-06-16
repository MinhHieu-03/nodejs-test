const mongoose = require("mongoose");

async function connect() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/education_dev');
        console.log("Kết nối đến MongoDB thành công");
    } catch (error) {
        console.error("Lỗi kết nối đến MongoDB:", error);
    }

}
module.exports = {
    connect,
};