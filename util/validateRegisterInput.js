const validateInput = (obj)=>{
    if(!obj.hasOwnProperty("name") || !obj.hasOwnProperty("username") || !obj.hasOwnProperty("birthday") || !obj.hasOwnProperty("phone") || !obj.hasOwnProperty("password")){
        return false
    }

    return true
}

module.exports = validateInput;