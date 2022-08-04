const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8_education_dev");
    console.log("kết nối thành công");
  } catch (error) {
    console.log("kết nối không thành công");
  }
}
module.exports = { connect };
