const ImageKit = require('../utils/imagekit');

function uploadFile(userId, file) {
    return new Promise((resolve, reject) => {
        ImageKit.upload({
            file: file.buffer,
            fileName: userId,
            folder: `/cohort`
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = uploadFile