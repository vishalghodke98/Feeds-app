
const post = require('../models/post-mpdal-shema');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const path = require('path');
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");

// const storage = new GridFsStorage({
//     url: process.env.conectionUrl,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             const filename = `image-${Date.now()}${path.extname(file.originalname)}`
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'images'
//             }
//             resolve(fileInfo);
//         });
//     }
// });

// const upload = multer({ storage });

// const conectionUrl = process.env.conectionUrl || 'mongodb+srv://admin:vishal1234@cluster0.yuwek.mongodb.net/you_book?retryWrites=true&w=majority';

// const conn = mongoose.createConnection(conectionUrl, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// let gfs

// conn.once('open', () => {
//     console.log('connected')
//     gfs = Grid(conn.db, mongoose.mongo)
//     gfs.collection('images')
// });

module.exports = (app, connection) => {
    app.get('/api/retriveimages/single1', (req, res) => {
        console.log('here')
        gfs.files.findOne({ filename: req.query.name }, (err, file) => {
            if (err) return res.status(400).json({ message: 'something wents wrong' })
            if (!file || file.length === 0) return res.status(400).json({ message: 'NO file found ' });
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        });
    });
    // app.post('/api/upload/image1', upload.single('file'), (req, res) => {
    //     res.send(req.file)
    // });

    app.post('/api/upload/post', (req, res) => {
        const dbpost = req.body;
        console.log(dbpost)
        post.create(dbpost, (err, data) => {
            if (err) return res.staus(400).json({ message: 'somethin wents wrong' });
            return res.send(data);
        });
    });

    app.get('/api/retrive/posts', (err, res) => {
        post.find((err, data) => {
            if (err) return res.status(400).json({ message: 'Error while geting posts' })
            data.sort((b, a) => {
                return a.timestamp - b.timestamp;
            })
            res.send(data)
        })
    })
}