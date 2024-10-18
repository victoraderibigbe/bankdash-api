const validatePassword = (password) => {
    const errors = [];
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.-_=+/|'~`;?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
  
    if (!isLongEnough) {
      errors.push("Password must be at least 8 characters long.");
    }
  
    if (!hasUpperCase) {
      errors.push("Password must include at least one uppercase letter.");
    }
  
    if (!hasLowerCase) {
      errors.push("Password must include at least one lowercase letter.");
    }
  
    if (!hasNumber) {
      errors.push("Password must include at least one number.");
    }
  
    if (!hasSpecialChar) {
      errors.push("Password must include at least one special character.");
    }
  
    return errors;
  };

module.exports = { validatePassword }
  