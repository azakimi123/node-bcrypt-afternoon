require('dotenv').config();

const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      app = express(),
      {CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController');
      PORT = 4000;

app.use(express.json());

//make a session
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60}//cookie for 1 min
    })
);


//connect to database
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    },
}).then(db => {
    app.set('db', db);
    console.log('db connected')
})


//Endpoints
app.post('/auth/register', authCtrl.register);










app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });