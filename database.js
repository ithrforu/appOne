const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')


const db = new sqlite3.Database('db.sqlite', (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
      console.log('Connected to the SQLite database.')
      db.run(`CREATE TABLE user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          login text,
          password text, 
          CONSTRAINT login_unique UNIQUE (login)
          )`,
      (err) => {
          if (err) {
              // Table already created
          } else {
              // Table just created, creating some rows
              const insert = 'INSERT INTO user (login, password) VALUES (?,?)'
              db.run(insert, ['admin', md5('admin123456')]);
          }
      });  
  }
});


module.exports = db
