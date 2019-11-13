require("dotenv").config();
const express = require("express");
const router = express.Router();
const Art = require("../models/Art");
const multer = require("multer");
var AWS = require("aws-sdk");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


router.post("/upload", upload.single("file"), function(req, res) {
  console.log(req);
  const file = req.file;
  const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });


  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    debugger;
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.send({ data });
      var newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileURL + file.originalname,
        s3_key: params.Key
      };
      var art = new Art({photoLink: newFileUploaded.fileLink, title: req.body.title, description: req.body.description, author: req.body.author, category: req.body.category});
      art.save(function(error, newFile) {
        if (error) {
          throw error;
        }
      });
    }
  });
});

module.exports = router;
