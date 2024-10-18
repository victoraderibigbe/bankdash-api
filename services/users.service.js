const db = require('../model');
const { validateBiodata } = require("../validator/bioData.validator");


const { AppError } = require('../utils/error');

 

class UserService {
    
    async getUserData(id) {
        try {
            const User = await db.User.findOne({
                where: { userId: id },
                include: [
                    {
                        model: db.User
                    }
                ]
            });
            if (!User) {
                throw  AppError('User not found', 404);
            }
            return User;
        } catch (error) {
            throw error;
        }
    }
    
    async getUsersData(id) {
        try {
            const User = await db.User.findAll();
            if (!User) {
                throw new AppError('User not found', 404);
            }
            return User;
        } catch (error) {
            throw error;
        }
    }


  async update_bio_data(data, userId) {
    try {
      const {
        title,
        firstname,
        lastname,
        middlename,
        dateOFbirth,
        phone,
        gender,
      } = data;
      let withMessage = validateBiodata(data);

      if (withMessage.isValid == false) {
        AppError(withMessage, 401);
      }
      if (!userId) {throw AppError("login", 401);}
      const result = await db.User.update(
        {
          title,
          firstname,
          lastname,
          middlename,
          dob: dateOFbirth,
          phone,
          gender,
        },
        {
          where: {
            userId : userId,
          },
        }
      );
      if (result[0] === 0) {
        throw AppError("Not updated", 401);
      } else {
        return true;
      }
    } catch (error) {
      throw AppError(error, 500);
    }
  }


}

module.exports = new UserService();