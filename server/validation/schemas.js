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
  password: Joi.string().pattern(
    new RegExp("/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,24}$/")
  ),
  confirmedPassword: Joi.ref("password"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "edu"] }
  })
});

/**
 *
 * Login Validation Schema
 *
 */

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "edu"] }
  }),
  password: Joi.string().pattern(
    new RegExp("/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,24}$/")
  )
});

export { registrationSchema, loginSchema };
