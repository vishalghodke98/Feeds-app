
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
    url: process.env.conectionUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            }
            resolve(fileInfo);
        }); l
    }
});

const upload = multer({ storage });
