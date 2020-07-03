const express = require('express');
const cors = require('cors');
const db = require('./models');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');

const authController = require('./controllers/auth');
const linkController = require('./controllers/link');

const app = express();

app.use(cors());
app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// pré-fixo das rotas  /auth/sign-in
// /auth/sign-up
app.use('/auth', authController);
app.use('/link', linkController);

app.get('/', (req, res)=>{
    return res.json('Api running');
});

db.sequelize.sync().then(()=> {
    app.listen(3001, ()=>{
    console.log('Server is running');
    });
});