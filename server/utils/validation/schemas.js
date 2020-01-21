import Joi from "@hapi/joi";

/**
 * Registration Validation Schema
 *
 */

const registrationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(25)
    .required(),
  password: Joi.string()
    .pattern(
      // password must contain at least: one lowercase, one uppcase,one digit, and one special character and be between 6 - 24 characters.
      new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,24}$")
    )
    .required(),
  confirmedPassword: Joi.ref("password"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "edu"] }
    })
    .required(),
  firstName: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{2,30}$"))
    .required(),
  lastName: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{2,30}$"))
    .required(),
  isAdmin: Joi.boolean()
});

/**
 *
 * Login Validation Schema
 *
 */

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "edu"] }
    })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{6,24}$")
    )
    .required()
});

export { registrationSchema, loginSchema };
