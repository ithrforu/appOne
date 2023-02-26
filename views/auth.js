const db = require("../database.js");
const md5 = require('md5');


// TODO валидация входных данных
const authView = (req, res) => {
  const body = req.body;
  if (body.login === undefined | body.password === undefined) {
    res.status(400).json({error: 'Login or password are undefined'});
    return
  }

  const sql = "select * from user where login=? and password=?";
  const params = [body.login, md5(body.password)];

  db.all(sql, params, (err, rows) => {
    if(err) {
      res.status(400).json({error: err.message});
      return;
    }

    if(rows.length === 0) {
      res.status(401).json({error: 'Login or password are incorrect.'});
      return;
    }

    res.cookie('user', body.login, {signed: true});
    res.json({message: 'success'});
  });
};


const registrationView = (req, res) => {
  const body = req.body;
  const sqlCheckUser = "select * from user where login=?";

  db.all(sqlCheckUser, [body.login], (err, rows) => {
    if(err) {
      res.status(400).json({error: err.message});
      return;
    }

    if(rows.length !== 0) {
      res.status(200).json({error: 'Login already exists.'});
      return;
    }

    db.run(
      'INSERT INTO user (login, password) VALUES (?,?)', 
      [body.login, md5(body.password)], 
      (err) => {
        if(err) {
          res.status(400).json({error: err.message});
          return;
        }
    
        res.json({message: 'success'});
      } 
    );
  });
};


module.exports = {
  authView,
  registrationView,
};
