import joi from "joi";

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    firstname: joi.string().min(2).required(),
    lastname: joi.string().min(2).required(),
    username: joi.string().min(3).required(),
    dob: joi.date().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export { signupValidation, loginValidation };
