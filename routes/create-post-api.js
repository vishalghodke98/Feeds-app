bodyParser = require('body-parser');
const CreatePost = require('../models/create-post-scema');

module.exports = (app, connection) => {
    app.use(bodyParser.json());

    /*Post API to save profile*/
    app.post("/api/create_post", (req, res) => {
        console.log(req.body)
        const post = new CreatePost({
            file: req.body.file,
            user: req.body.user,
            likes: 0,
            comments: req.body.comments,
            message: req.body.message,
            timestamp: new Date(),
            profile: req.body.profile
        });
        post.save().then(response => {
            return res.send(response);
        }).catch(err => {
            console.log(err)
            return res.status(400).json({ message: 'Error while adding image' });
        });
    });

    /*Get profile list API*/
    app.get('/api/get_posts', (req, res) => {
        CreatePost.find().then(response => {
            if (!response.length) return res.status(400).json({ message: 'No records founds' });
            return res.send(response);
        }).catch(error => {
            return res.status(400).json({ message: 'Somethin went wrong  while geting frofile list' });
        });
    });


    app.put('/api/update_post/:_id', (req, res) => {
        const _id = req.params._id;
        console.log(req.body.likes, _id)
        CreatePost.update({ _id: _id }, {
            file: req.body.file,
            user: req.body.user,
            likes: req.body.likes,
            comments: req.body.comments,
            message: req.body.message,
            timestamp: new Date()
        }).then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update Tutorial comment id=${_id}!` });
            } else res.send({ message: 'updated successfully' });
        }).catch(err => {
            return res.status(500).send({ message: "Error updating with id=" + _id });
        });
    });
}