// db.js
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/imageDB");
module.exports = mongoose;