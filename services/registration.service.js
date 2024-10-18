const db = require("../model");
const { AppError, errorHandler } = require("../utils/error");
const State = db.PoliticalState;
const Country = db.Country;
const Lga = db.lga;
const User = db.User;
// const Account = db.Account;
const { validateRegister } = require("../validator/userSignup.validator");
const { encrypt } = require("../utils/crypto");
// const { validateBiodata } = require("../validator/bioData.validator");
const account = require("./account");

class RegistrationService {
  async info(data) {
    try {
      let name = {};
      let withMessage = validateRegister(data);
      if (withMessage.isValid == false) {
        errorHandler(withMessage.errors);
      }
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        throw new AppError("Invalid Username", 401);
      }
      const hashedPassword = await encrypt(data.confirm_password);
      const newAdmin = await User.create({
        email: data.email,
        password: hashedPassword,
      });
      name = newAdmin;
      name.password = null;
      if (account(name.userId)) {
        return name;
      }
    } catch (error) {
      throw error;
    }
  }

  async bio_data(data) {
    try {
      const {
        email,
        title,
        firstname,
        lastname,
        middlename,
        dateOFbirth,
        phone,
        gender,
      } = data;

      // let withMessage = validateBiodata(data);
      // if (withMessage.isValid == false) {
      //  new AppError(withMessage, 401);
      // }

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new AppError("Invalid email", 401);
      }
      const result = await User.update(
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
            email: email,
          },
        }
      );
      if (result[0] === 0) {
        throw new AppError("Not updated", 401);
      } else {
        return true;
      }
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  async create_contact(data) {
    try {
      null;
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  async countries() {
    const countries = await Country.findAll();
    return countries;
  }

  async country(data) {
    const countryId = parseInt(data);
    const country = await Country.findOne({ where: { countryId } });
    return country;
  }

  async states(data) {
    const countryId = parseInt(data);
    const states = await State.findAll({ where: { countryId } });
    return states;
  }

  async state(country_Id, state_Id) {
    const stateId = parseInt(state_Id);
    const countryId = parseInt(country_Id);
    const state = await State.findOne({ where: { stateId, countryId } });
    return state;
  }

  async lgas(stateId) {
    const lgas = await Lga.findAll({ where: { stateId } });
    return lgas;
  }

  async lga(stateId, lgaId) {
    const lga = await Lga.findOne({ where: { stateId, lgaId } });
    return lga;
  }
}

module.exports = RegistrationService;
