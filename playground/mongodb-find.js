const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB Server');

  db.collection('Users').find({
    name: 'Camilo'
  }).toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 3));
  }, (err) =>{
    console.log('error fetching ', err);
  });

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  // }, (err) =>{
  //   console.log('error fetching ', err);
  // });


  //db.close();
});
