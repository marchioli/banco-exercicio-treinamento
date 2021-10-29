const formidable = require('formidable');
const AWS = require('aws-sdk');
const fs = require('fs');

const crypto = require("crypto");
var path = require('path')
const uuid = require('uuid-v4')


const uploadImageStream = (req, res, next) => {

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        
        const s3Client = require('./s3Client');
        const url = await s3Client.uploadFile(files.filetoupload.name, files.filetoupload.path);
        res.send({statusUpload : 'File uploaded!',
                 url: url
    });
    });

}


module.exports = {uploadImageStream}