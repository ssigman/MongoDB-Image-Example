// models/image.js
var db = require("../db");

var Image = db.model("Image", {
    filename:  String,
    photo_name: String,
    album: String,
    description: String,
    f_stop: String,
    s_speed: String,
    iso: String,
    focus_len: String,
    camera: String,
    upload_date: { type: Date, default: Date.now }
});

module.exports = Image;