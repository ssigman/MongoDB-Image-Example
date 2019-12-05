const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const Image = require("./models/image");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// set upload object to store pictures to correct location
var upload = multer({ storage: storage })

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', upload.single('photo'), (req, res) => {
    // log the file upload to console
    if(req.file) {
        //res.json(req.file);
        console.log("File: " + req.body.photoName + " saved on.");
    }
    else throw 'error';
    
    // make a new Image object from the input data
    var img = new Image({
        filename: req.file.filename,
        photo_name: req.body.photoName,
        album: req.body.album,
        upload_date: new Date()
    });

    // save the image to the database
    img.save(function(err, img) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send("Image was saved.");
        }
    });
});

app.get('/getImages', (req,res) =>{
    Image.find({},(err,img) => {
               res.json(img);
               });
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});