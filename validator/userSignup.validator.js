
const isEmpty = require("is-empty");
const Validator = require("validator");
 

const  validateRegister = (body)=>{
    console.log({email, password, confirm_password} = body)
        let errors = {};
        
        body.email = !isEmpty(body.email) ? body.email : "";
        
        body.password = !isEmpty(body.password) ? body.password : "";

        body.confirm_password = !isEmpty(body.confirm_password) ? body.confirm_password : "";
    
        if (Validator.isEmpty(body.email)) {
    
            errors.email = "Invalid Credential"
    
        } else if (!Validator.isEmail(body.email)) {
    
            errors.email = "Invalid Credential";
    
        }
        if (Validator.isEmpty(body.password)) {
    
            errors.password = "Invalid Credential";
    
        }
        
        if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
    
            errors.password = "Invalid Credential";
    
        }

        if (body.password != body.confirm_password){
            errors.password = 'Passwords do not match.';
        }


      return {

        errors,

        isValid: isEmpty(errors)

       };


};

module.exports = {

    validateRegister
}