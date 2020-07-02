const Joi = require('@hapi/joi');
// validação para cada um  dos metodos do controller utilizando a lib joi
const { getValidatorError } = require('../helpers/validator');


const accountSignUp = (req, res, next) =>{
    const { email, password, password_confirmation } = req.body;
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        //confirmação de senha para saber se ambas as senha são iguais
        password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    });

    //verifica se todos os campos são validos um a um
    //caso não seja irá retornar o campo exato que deu erro 
    const verify = { abortEarly: false };
//retorna a validação de cada campo do schema
    const { error } = schema.validate({ email, password, password_confirmation }, verify);
   if(error){
    const messages = getValidatorError(error, 'account.signup');
    return res.jsonBadRequest(null, null,{error: messages});
   }

    next();
};

module.exports = { accountSignUp };