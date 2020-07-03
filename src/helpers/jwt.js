require('dotenv').config();
const jwt = require('jsonwebtoken');

//chave de criptografia
const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
//periodo de expireção do token
const options = {  expiresIn: '30 minutes'};
const refreshOptions = { expiresIn: '30 days' };

//gerando um jwt
const generateJwt = (payload)=>{
    return jwt.sign(payload, tokenPrivateKey, options)
};

const generateRefreshJwt = (payload) =>{
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

const getTokenFromHeaders = (headers) => {
    let token = headers['authorization'];
    return token ? token.slice(7,  token.lenght) : null;
   
}
//verificação do jwt
const verifyJwt = (token) =>{
    return jwt.verify(token, tokenPrivateKey);
};

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey);
};

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeaders };