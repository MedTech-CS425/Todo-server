const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json())
mongoose.connect('mongodb+srv://admin:admin@cluster0.iglhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MOngoDb');
});

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});
const Todo = mongoose.model('Todo', TodoSchema);

app.post('/todo', async (req, res)=> {
  await Todo.create(req.body);
  res.status(201).json({success: true})
});
app.get('/todo', async (req, res)=> {
  const todos = await Todo.find();
  res.status(200).json(todos);
});
app.delete('/todo/:id', async (req, res)=> {
  await Todo.findByIdAndRemove(req.params.id);
  const todos = await Todo.find();
  res.status(201).json(todos);
});
app.put('/todo/:id', async (req, res)=> {
  await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({success: true})
});

app.listen('3000', ()=>{
    console.log('Listening on 3000');
})