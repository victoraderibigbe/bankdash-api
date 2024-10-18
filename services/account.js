const db = require('../model');
const { AppError, errorHandler } = require('../utils/error');


function account(userId){
    const initialBalance = 10000.0;
    const AccountNumber  = Math.floor(10000000 + Math.random() * 90000000)
    const createAcct = db.Account.create({
        UserId : userId,
        AccountNumber : AccountNumber,
        AccountBalance : initialBalance
    })
    if(!createAcct){throw AppError(error, 500)}
    return true
}

module.exports =  account