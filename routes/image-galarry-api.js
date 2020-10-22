bodyParser = require('body-parser');
const ImageGalarry = require('../models/create-profile');

module.exports = (app, connection) => {
    app.use(bodyParser.json());

    /*Post API to save profile*/
    app.post("/api/image", (req, res) => {
        const fileName = req.body.file_name;
        const idxDot = fileName.lastIndexOf(".") + 1;
        const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        } else {
            return res.status(400).json({ message: 'Only image media is suported' });
        };
        const image = new ImageGalarry({
            file_name: req.body.file_name,
            file_data: req.body.file_data,
            timestamp: new Date()
        });
        image.save().then(response => {
            return res.send({ message: 'Images added sucessfully' });
        }).catch(err => {
            return res.status(400).json({ message: 'Error while adding image' });
        });
    });

    /*Get profile list API*/
    app.get('/api/image', (req, res) => {
        console.log('back')
        ImageGalarry.find().then(response => {
            if (!response.length) return res.status(400).json({ message: 'No records founds' });
            return res.send(response);
        }).catch(error => {
            console.log(error)
            return res.status(400).json({ message: 'Somethin went wrong  while geting frofile list' });
        });
    });

    app.delete('/api/profile/:_id', (req, res) => {
        ImageGalarry.deleteOne({ _id: req.params._id }, (deleteErr, deleteRes) => {
            if (deleteErr) return res.status(400).json({ message: 'Error while deleting profile' });
            return res.send({ message: 'Profile deleted sucessfully' });
        });
    });
}