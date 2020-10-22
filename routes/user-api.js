bodyParser = require('body-parser');
const User = require('../models/user-schema');
const bcrypt = require('bcrypt');


module.exports = (app, connection) => {
  app.use(bodyParser.json());

  app.post('/api/signup', (req, res) => {
    User.find({ email: req.body.email }, (findErr, findRes) => {
      console.log(req.body)
      if (findErr) return res.status(400).json({ message: 'Error while finding user' });
      if (findRes.length) return res.status(400).json({ message: 'User alredy exist' });
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log(err)
        if (err) return res.status(400).json({ message: 'Error while creating the hash passwaord' });
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          profile: req.body.profile
        });
        user.save().then(response => {
          return res.send({ message: 'User created sucessfully', data: response });
        }).catch(err => {
          return res.status(400).json({ message: 'Error while creating user' });
        });
      });
    });
  });

  app.post('/api/signin', (req, res) => {
    User.find({ email: req.body.email }, (findErr, findRes) => {
      if (findErr) return res.status(400).json({ message: 'Error while findig user' });
      if (!findRes.length) return res.status(400).json({ message: 'User does not exist, Please signup' });
      bcrypt.compare(req.body.password, findRes[0].password, (passErr, passRes) => {
        console.log(passRes)
        if (passErr || !passRes) return res.status(400).json({ message: 'Please enter correct password' });
        return res.send({ message: 'Loged in sucessful' });
      });
    });
  });
}
