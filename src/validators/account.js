const Joi = require('@hapi/joi');
// validação para cada um  dos metodos do controller utilizando a lib joi
const { getValidatorError } = require('../helpers/validator');

const rules = {
     email: Joi.string().email().required(),
     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
     password_confirmation: Joi.string().valid(Joi.ref('password')).required()
    }
        //verifica se todos os campos são validos um a um
    //caso não seja irá retornar o campo exato que deu erro
    const options = { abortEarly: false };

const accountSignIn = (req, res, next) =>{
    const { email, password } = req.body;
    
    const schema = Joi.object({
        email: rules.email,
        password: rules.password
    });

    //verifica se todos os campos são validos um a um
    //caso não seja irá retornar o campo exato que deu erro 
    
//retorna a validação de cada campo do schema
    const { error } = schema.validate({ email, password }, options);
   if(error){
    const messages = getValidatorError(error, 'account.signin');
    return res.jsonBadRequest(null, null,{error: messages});
   }

    next();
};


const accountSignUp = (req, res, next) =>{
    const { email, password, password_confirmation } = req.body;
    
    const schema = Joi.object({
        email: rules.email,
        password: rules.password,
        //confirmação de senha para saber se ambas as senha são iguais
        password_confirmation: rules.password_confirmation,
    });
 

//retorna a validação de cada campo do schema
    const { error } = schema.validate({ email, password, password_confirmation }, options);
   if(error){
    const messages = getValidatorError(error, 'account.signup');
    return res.jsonBadRequest(null, null,{error: messages});
   }

    next();
};

module.exports = { accountSignUp, accountSignIn };