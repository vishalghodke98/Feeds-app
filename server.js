const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const mongoose = require("mongoose");
const PORT = process.env.PORT || '5000';
const cors = require('cors');
const Pusher = require('pusher');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const post = require('./models/post-mpdal-shema');

app.use(bodyParser.json({
  limit: '150mb',
  verify: (req, res, buf) => { req.rawBody = buf; }
}));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

// app.use((cors));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/media', express.static(__dirname + '/media'));

app.use(express.static(path.join(__dirname, process.env.FORNT_END)));

/*mongodb connection using mongoose*/

Grid.mongo = mongoose.mongo

const conectionUrl = process.env.conectionUrl || 'mongodb+srv://admin:vishal1234@cluster0.yuwek.mongodb.net/you_book?retryWrites=true&w=majority';

const conn = mongoose.createConnection(conectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('images')
});

const storage = new GridFsStorage({
  url: conectionUrl,
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

mongoose.connect(conectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDb Connected....')).catch(err => console.log(err));

mongoose.Promise = global.Promise;


app.post('/api/upload/image', upload.single('file'), (req, res) => {
  console.log('here')
  console.log(req.file)
  res.send({ file: req.file })
});

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

app.get('/api/retriveimages/single', (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    console.log(err)
    if (err) return res.status(400).json({ message: 'something wents wrong' })
    if (!file || file.length === 0) return res.status(400).json({ message: 'NO file found ' });
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});


/*API ROUTES*/
require('./routes/index')(app, mongoose);

app.listen(PORT, () => { console.log(`Server is running.. on port ${PORT}`); });