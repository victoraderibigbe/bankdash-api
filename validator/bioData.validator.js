
const isEmpty = require("is-empty");
const Validator = require("validator");
 

const  validateBiodata = (body)=>{
    const {title, firstname, lastname, middlename, dateOFbirth, gender, phone} = body;
    
        let errors = {};

        body.title  = !isEmpty(body.title) ? body.title : "";
        
        body.firstname = !isEmpty(body.firstname) ? body.firstname : "";

        body.lastname = !isEmpty(body.lastname) ? body.lastname : "";

        body.middlename = !isEmpty(body.middlename) ? body.middlename : "";

        body.dateOFbirth = !isEmpty(body.dateOFbirth) ? body.dateOFbirth : "";

        body.gender = !isEmpty(body.gender) ? body.gender : "";

        body.phone = !isEmpty(body.phone) ? body.phone : "";
    
        if (Validator.isEmpty(body.title)) {
            errors.title = "Invalid Credential"
        } 
        if (Validator.isEmpty(body.firstname)) {
            errors.firstname = "Invalid Credential";
        }
        if (Validator.isEmpty(body.lastname)) {
            errors.lastname = "Invalid Credential";
        }
        if (Validator.isEmpty(body.middlename)) {
            errors.middlename = "Invalid Credential";
        }
        if (Validator.isEmpty(body.dateOFbirth)) {
            errors.dateOFbirth = "Invalid Credential";
        }
        if (Validator.isEmpty(body.gender)) {
            errors.gender = "Invalid Credential";
        }   
        if (Validator.isEmpty(body.phone)) {
            errors.phone = "Invalid Credential";
        }
        
      return {

        errors,

        isValid: isEmpty(errors)

       };


};

module.exports = {

    validateBiodata
}