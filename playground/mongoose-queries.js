const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userId= '582b393823edec081ba0cd56';
// var id = '582cf79331b911f4347fea13';
//
// var valid = ObjectID.isValid(id);
// if(!valid) {
//   console.log('Id is invalid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) =>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) =>{
//   if(!todo){
//     return console.log('id not found');
//   }
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) =>{
  if(!user) {
    return console.log('User not found');
  }
  console.log('User', user);
}).catch((e) => console.log(e));
