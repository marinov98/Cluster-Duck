import validator from "validator";
import isEmpty from "is-empty";

export function validateRegister(user) {
  let errors = {};

  // check if fields are Empty
  user.email = isEmpty(user.email) ? "" : user.email;
  user.username = isEmpty(user.username) ? "" : user.username;
  user.password = isEmpty(user.password) ? "" : user.password;
  user.confirmedPassword = isEmpty(user.confirmedPassword) ? "" : user.confirmedPassword;

  // Check email
  if (validator.isEmpty(user.email) || !validator.isEmail(user.email))
    errors.email = "Invalid Email!";

  if (validator.isEmpty(user.username)) errors.username = "empty username!";

  if (
    validator.isEmpty(user.password) ||
    !validator.isLength(user.password, { min: 6, max: 30 })
  )
    errors.password = "Password must be between 6 and 30 characters!";

  if (
    validator.isEmpty(user.confirmedPassword) ||
    !validator.isLength(user.confirmedPassword, { min: 6, max: 30 })
  )
    errors.confirmedPassword = "Password must be between 6 and 30 characters";
  else if (!validator.equals(user.password, user.confirmedPassword))
    errors.confirmedPassword = "Passwords do not match";

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
