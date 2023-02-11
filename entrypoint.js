const express = require('express');
const app = express();
const cookieParser =require('cookie-parser');

// Settings
const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_KEY || 'secret';


// Views
const auth = require('./views/auth.js');


// Uses
app.use(cookieParser(SECRET_KEY));
app.use(express.json());
// app.use(express.static(__dirname));
// app.use(express.static(path.resolve(__dirname, 'build')));


// Routing
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/auth', auth.authView);
app.post('/registration', auth.registrationView);

// TODO: Проверить авторизацию двух валидных пользователей одновременно
// TODO: Доделать авторизацию для запросов без хендлера /auth
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#the_general_http_authentication_framework
app.get('/api/*', (req, res) => {
  if(req.signedCookies.user === undefined) {
    res.sendStatus(401);
    return;
  }

  res.send('Hello World!');
});


// Start
app.listen(PORT, () => {
  console.log('App started on port: http://localhost:' + PORT);
});