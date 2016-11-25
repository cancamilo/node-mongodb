const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'mano55@exel.com',
  password: 'passz1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'coco').toString()
  }]
}, {
  _id : userTwoId,
  email: 'yoyo@hotmail.com',
  password :'jackrabbit'
}];

const todos =[{
  _id: new ObjectID(),
  text: 'first test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 123
}];

const populateUsers = (done) =>{
  User.remove({}).then(() =>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const populateTodos = (done) =>{
  Todo.remove({}).then(() =>{
    return Todo.insertMany(todos);
  }).then(() =>{
      done();
  });
};

module.exports = {todos, populateTodos, users, populateUsers};
