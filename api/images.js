// RESTful API for image manipulation
// Version: 0.11 (2/1/2020)
// Author: S. Sigman
// Notes: 
// 1. Sprint 1: First implementation RESTful api for
//    manipulating images. Provides routes for: 
//    a) retrieving all images in the database (api/images - GET),
//    b) saving an image in the database & uploading the image
//       to the public/images directory with a unique name.
// 2. Image upload is handled by the Multer node module.

const Image = require('../models/image');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

// Set storage for Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      // make a unique filename
      cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

// set upload object to store pictures to correct location
var upload = multer({ storage: storage });

// API to get all images (api/images)
router.get('/', (req,res) =>{
    console.log('Get all images called!')
    Image.find({},(err,img) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
               res.json(img);
        }
    });
});

router.post('/', upload.single('photo'), (req, res) => {
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
        description: req.body.description,
        f_stop: req.body.f_stop,
        s_speed: req.body.s_speed,
        iso: req.body.iso,
        camera: req.body.camera,
        upload_date: new Date()
    });

    // save the image to the database
    img.save((err, img)=> {
        if (err) {
            res.status(400).send(err);
        } else {
            //res.send("Image was saved.");
            res.redirect('/home.html');
        }
    });
});

module.exports = router;