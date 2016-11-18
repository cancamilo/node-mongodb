const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) =>{
//   console.log('Succeded removing', result);
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()
//Todo.findOneAndRemove((_id:'.......'))
Todo.findByIdAndRemove('582f05d429a00fdf955cb6cb').then( (todo) =>{
    console.log(todo);
});
