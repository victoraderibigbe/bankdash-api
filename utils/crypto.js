const bcrypt = require("bcryptjs");
const saltRounds = 10;
const encrypt = async (data) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    console.log(hash)
    return hash;
  } catch (error) {
    return false;
  };
};

const compare = async (data, hash) => {
  const value = await bcrypt.compare(data, hash);
  return value;
};

module.exports = {
  encrypt,
  compare
}