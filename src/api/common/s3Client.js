const AWS = require('aws-sdk');
const fs = require('fs');

const crypto = require("crypto");
var path = require('path')
const uuid = require('uuid-v4')



let accessKeyId1 = ' '
let secretAccessKey2 = ' '

if (process.env.NODE_ENV == 'dev') {
    let { accessKeyId, secretAccessKey } = require('../../.env')

    accessKeyId1 = accessKeyId
    secretAccessKey2 = secretAccessKey

}

if (process.env.NODE_ENV == 'prod') {
    accessKeyId1 = process.env.accessKeyId,
    secretAccessKey2 = process.env.secretAccessKey
}

const s3 = new AWS.S3({
    accessKeyId: accessKeyId1,
    secretAccessKey: secretAccessKey2
});


async function uploadFile(fileName, filePath, mimeType) {

    const fileContent = fs.readFileSync(filePath);
    const id = uuid()
    const params = {
        Bucket: 'treinamento-ibmaws-imagens',
        Key: `${id}.jpg`,
        ACL: 'public-read',
        Body: fileContent,
        //ContentType: mimeType//geralmente se acha sozinho
    };

    const data = await s3.upload(params).promise();
    return data.Location;
}


module.exports = { uploadFile }