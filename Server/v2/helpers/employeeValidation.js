import Hapi from '@hapi/joi';

const validation = employee => {
  const Schema = Hapi.object({
    firstname: Hapi.string().required(),
    lastname: Hapi.string().required(),
    email: Hapi.string()
      .email()
      .required(),
    password: Hapi.string().required(),
    gender: Hapi.string()
      .valid('male', 'female')
      .required(),
    jobRole: Hapi.string().required(),
    department: Hapi.string().required(),
    address: Hapi.string().required()
  });

  return Schema.validate(employee);
};

export default validation;
