var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = { '_id': new ObjectID(id) };

    db.collection('users').findOne(user, (err, retrievedUser) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(retrievedUser);
      }
    });
  });

  app.post('/users', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };

    db.collection('users').insert(user, (err, createdUser) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(createdUser.ops[0]);
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = { '_id': new ObjectID(id) };

    db.collection('users').remove(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('User deleted!');
      }
    });
  });

  app.put('/users/:id/password', (req, res) => {
    const id = req.params.id;
    const user = { '_id': new ObjectID(id) };
    const password = { '$set': { password: req.body.password } };

    db.collection('users').update(user, password, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Password updated!');
      }
    });
  });
};
