const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Schema = mongoose.Schema;


const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
});

const uri = 'mongodb+srv://ArtemBeydin:Restart987@cluster0.cm9vp.mongodb.net/ToDoDB?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('tasks', taskScheme);

app.use(express.json());

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send({ data: result })
  });
})

app.post('/createTask', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.send('task created');
  });
});


app.delete('/deleteTask', (req, res) => {
  Task.deleteOne({ _id: req.query._id }).then((result) => {
    Task.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.patch('/updateTask', (req, res) => {
  Task.updateOne({ _id: req.query._id }, req.body).then((result) => {
    Task.find().then((result) => {
      res.send({ data: result });
    });
  })
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});