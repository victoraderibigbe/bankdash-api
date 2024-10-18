const Validator = require("validator");

const isEmpty = require("is-empty");

module.exports =  function validateRegister(body){

        let errors = {};
        
        body.email = !isEmpty(body.email) ? body.email : "";
    
        if (Validator.isEmpty(body.email)) {
    
            errors.email = "Email field is required";
    
        } else if (!Validator.isEmail(body.email)) {
    
            errors.email = "Email is invalid";
    
        }
      return {

        errors,

        isValid: isEmpty(errors)

       };


};