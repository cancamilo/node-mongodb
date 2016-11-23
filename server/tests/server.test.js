const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos =[{
  _id: new ObjectID(),
  text: 'first test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 123
}, {
  _id: new ObjectID(),
  text: 'last test todo',
  completed: true,
  completedAt: 123
}];

beforeEach((done) =>{
  Todo.remove({}).then(() =>{
    return Todo.insertMany(todos);
  }).then(() =>{
      done();
  });
});

describe('POST /todos', () =>{
  it('should create a new todo', (done) =>{
    var text = 'Todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect( (res) =>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res) =>{
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos) =>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch( (e) => done(e));
    });
  });

  it('should not add bad data', (done) =>{

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) =>{
        if (err) {
          return done(err);
        }

      Todo.find().then((todos) =>{
        expect(todos.length).toBe(3);
        done();
      }).catch( (e) => done(e));;
    });
  });

});

describe('GET /todos', () =>{
  it('should get all todos', (done) =>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) =>{
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () =>{
  it('should return todo doc', (done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect( (resp) =>{
      expect(resp.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) =>{
    // create new object id
    var _newId = new ObjectID();
    request(app)
      .get(`/todos/${_newId.toHexString()}`)
      .expect(404)
      .end(done);
    // make sure you get a 404 back
  });

  it('should return 404 for non-object ids', (done) =>{
    var fakeId = '1243';
    request(app)
      .get(`/todos/${fakeId}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () =>{
  it('should remove a todo', (done) =>{
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect( (res) =>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) =>{
        if(err){
          return done(err);
        }

        Todo.findById(hexId, (res) =>{
          expect(res).toNotExist();
          done();
        });
      });
  });

  it('should retun 404 if todo not found', (done)=>{
    // create new object id
    var _newId = new ObjectID();
    request(app)
      .delete(`/todos/${_newId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) =>{
    var fakeId = '1243';
    request(app)
      .delete(`/todos/${fakeId}`)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () =>{

  it('should update the todo', (done) =>{
    var id = todos[0]._id.toHexString();
    var txt = "updating test";
    var comp = true;
    request(app)
      .patch(`/todos/${id}`)
      .send({
        text: txt,
        completed: comp
      })
      .expect(200)
      .expect( (res) =>{
        expect(res.body.todo.text).toBe("updating test");
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
    //grab id of first item
    //update the text, set completed true
    // 200
    // text is changed, completed is true, completedAt is a number. ToBeA
  });

  it('should clear compeltedAt when todo is not completed', (done) =>{
    // grab id of second todo item
    // update textt, set ompleted to false
    // 200
    // text is changed, compleed false, completedat is null .toNotExist
    var id = todos[1]._id;
    var oldText = todos[1].text;
    var txt = "updating second test";
    var comp = false;
    request(app)
      .patch(`/todos/${id}`)
      .send({
        text: txt,
        completed: comp
      })
      .expect(200)
      .expect( (res) =>{
        expect(res.body.todo.text).toNotEqual(oldText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);

  });

});
