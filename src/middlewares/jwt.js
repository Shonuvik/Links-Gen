const { verifyJwt } = require("../helpers/jwt");


const checkJwt = (req, res, next) =>{

    // acabar com a verificação do JWT nessas rotas auth/sign-in
    // auth/sign-up

    //aliás: estou renomeado a variavel url para path
    const {url: path} = req;
    
    const excludedPaths = ['/auth/sign-in', '/auth/sign-up'];
    const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));
    if(isExcluded) return next();

   let token = req.headers['authorization'];
   token = token ? token.slice(7,  token.lenght) : null;
   if(!token) {
       return res.jsonUnauthorized(null, 'Invalid token');
   }

   try{
   const decoded = verifyJwt(token);
   req.accountId = decoded.id;
   next();
    }catch(error){
    return res.jsonUnauthorized(null, 'Invalid token');
    }   
   //mostrar data exata da expiração do token decodificado
   //console.log('decoded', new Date(decoded.exp * 1000));


};

module.exports = checkJwt;