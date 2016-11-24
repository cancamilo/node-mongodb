const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) =>{
//   bcrypt.hash(password, salt, (err, hash) =>{
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$6HYuoV26QC90BJIfjhz7p.02xJUJ5NyNZPIyyHU4dl0Vf23IWAub6';

bcrypt.compare(password, hashedPassword, (err, res) =>{
  console.log(res);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded ', decoded);

// var msg = 'Ich bin der storm';
//
// var hash = SHA256(msg).toString();
//
// console.log('message ', msg);
// console.log('hash ', hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data corrupted');
//}
