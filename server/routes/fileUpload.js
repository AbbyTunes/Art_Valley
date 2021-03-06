require("dotenv").config();
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const Art = require("../models/Art");
const User = require("../models/User");
const multer = require("multer");
var AWS = require("aws-sdk");


var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


router.post("/upload", upload.single("file"), function(req, res) {
  // console.log(req);
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
    // debugger;
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      
      var newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileURL + file.originalname,
        s3_key: params.Key
      };
      var art = new Art({photoLink: newFileUploaded.fileLink, title: req.body.title, description: req.body.description, author: req.body.author, category: req.body.category});

      art.save()
      .then((data) => {
        // console.log(res)
        Art.addCategory(data.cateogry, data._id)
        User.addPublishedArt(data.author, data._id)
        // console.log("DATA RESPONSE FROM FILEUPLOAD")
        // console.log(data)
        res.send({ data });
      })
      // .catch(err => console.log(err))
    }
  });
});



// router.route("/:id").delete((req, res, next) => {
//   DOCUMENT.findByIdAndRemove(req.params.id, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     //Now Delete the file from AWS-S3
//     // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
//     let s3bucket = new AWS.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       region: process.env.AWS_REGION
//     });

//     let params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: result.s3_key
//     };

//     s3bucket.deleteObject(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send({
//           status: "200",
//           responseType: "string",
//           response: "success"
//         });
//       }
//     });
//   });
// });


module.exports = router;
