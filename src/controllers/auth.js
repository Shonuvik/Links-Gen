const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt');

const router = express.Router();

const saltRounds = 10;

router.post('/sign-in', accountSignIn, async(req, res)=>{
    //verificação do email
    const { email, password } = req.body;
    const account = await Account.findOne({where: { email }})
   

    //validar a senha
   const match = account ? bcrypt.compareSync(password, account.password) : null;
    if(!match) return res.jsonBadRequest(null, getMessage("account.signin.invalid"));

    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({id: account.id});

    return res.jsonOK(account, getMessage("account.signin.success"), {token, refreshToken});
});
//as informações email e senha estão sendo validadas pelo middleware accountSignUp
//contido na pasta validators
router.post('/sign-up', accountSignUp,async(req, res)=>{
    //destructuring, desfragmentação de variaves 
    const {email, password} = req.body;
    
    const account = await Account.findOne({where: {email}})
    if (account) return res.jsonBadRequest(null, getMessage("account.signup.email_exists"));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({email, password: hash})
    
    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id});

    return res.jsonOK(newAccount, getMessage("account.signup.success"), {token, refreshToken});
});

module.exports = router;