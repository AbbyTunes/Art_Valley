require("dotenv").config();
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
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
debugger;
  let key = file ? file.originalname : "cool.jpeg";
  let body = file ? file.buffer : "";
  let ContentType = file ? file.mimetype : "";
  let fileLink = file ? s3FileURL + file.originalname : "https://art-valley-dev.s3.amazonaws.com/cool.jpeg";
  
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    // Key: file.originalname || "",
    Key: key,
    // Body: file.buffer,
    Body: body,
    // ContentType: file.mimetype,
    ContentType: ContentType,
    ACL: "public-read"
  };

  let s3_key = file ? params.Key : "cool.jpeg";

  s3bucket.upload(params, function(err, data) {
    debugger;
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      var newFileUploaded = {
        // fileLink: s3FileURL + file.originalname,
        fileLink: fileLink,
        s3_key: s3_key
        // s3_key: params.Key
      };
      var article = new Article({
        photoLink: newFileUploaded.fileLink,
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        header: req.body.header
      });

      article
        .save()
        .then(data => {
          console.log(res);
          console.log(data);
          res.send({ data });
        })
        .catch(err => console.log(err));
    }
  });
});

router.route("/:id").get((req, res, next) => {
  Article.findById(req.params.id, (err, go) => {
    if (err) {
      return next(err);
    }
    res.json(go);
  });
});

router.route("/edit/:id").put((req, res, next) => {
  debugger;
  Article.findByIdAndUpdate(
    req.params.id,
    { $set: { article: Object.keys(req.body)[0] } },
    { new: true },
    (err, updateDoc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(updateDoc);
    }
  );
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
