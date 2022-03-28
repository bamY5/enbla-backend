const jwt = require('jsonwebtoken')


const MatchUser = (req,res,id) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer"){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) return false

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        return decode.id == id
    } catch (error) {
        
    }
}

module.exports = MatchUser;