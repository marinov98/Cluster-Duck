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
    .required(), // password must contain at least: one lowercase, one uppcase,one digit, and one special character
  password: Joi.string()
    .pattern(
      new RegExp("/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,24}$/")
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
    .min(2)
    .pattern(new RegExp("/[A-Za-z]+/g"))
    .required(),
  lastName: Joi.string()
    .min(2)
    .pattern(new RegExp("/[A-Za-z]+/g"))
    .required()
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
      new RegExp("/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,24}$/")
    )
    .required()
});

export { registrationSchema, loginSchema };
