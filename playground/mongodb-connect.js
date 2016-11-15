const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB Server');

  // db.collection('Todos').insertOne({
  //   text: 'do the math',
  //   completed: false
  // }, (err, result) =>{
  //   if(err) {
  //     return console.log('Cannot add todo document ', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Camilo',
  //   age: 30,
  //   location: 'Ibague'
  // }, (err, result) =>{
  //     if(err) {
  //       return console.log('Cannot add todo document ', err);
  //     }
  //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});
