const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB Server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('582a66f0c416553f84071fd5')
  // },{
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) =>{
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate({
    name: 'Camilo'
  }, {
    $inc :{
      age: 8
    }
  }, {
    returnOriginal: false
  }).then((res) =>{
    console.log(res);
  });


});
