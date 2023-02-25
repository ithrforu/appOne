const express = require('express');
const app = express();
const cookieParser =require('cookie-parser');

// SETTINGS
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_KEY || 'secret';


// MIDDLEWARE
const requestTime = function (req, res, next) {
  console.log(`[${new Date().toISOString()}] Request: "${req.originalUrl}"`)
  next()
}

// TODO: Проверить авторизацию двух валидных пользователей одновременно
// TODO: Доделать авторизацию для запросов без хендлера /auth
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#the_general_http_authentication_framework
const cookieChecker = (req, res, next) => {
  if(req.signedCookies.user === undefined) {
    res.sendStatus(401);
    return;
  }
  next()
}


// VIEWS
const auth = require('./views/auth.js');


// USES
app.use(cookieParser(SECRET_KEY));
app.use(express.json());
app.use(requestTime);
// app.use(express.static(__dirname));
// app.use(express.static(path.resolve(__dirname, 'build')));


// ROUTING
// - GET
app.get('/', (req, res) => {res.send('Hello World!')});
app.get('/api/*', cookieChecker,  (req, res) => {res.send('Hello World!');});
// - POST
app.post('/auth', auth.authView);
app.post('/registration', auth.registrationView);


// START
app.listen(PORT, () => {
    console.log(`App started on port: http://${HOST}:${PORT}`);
});
