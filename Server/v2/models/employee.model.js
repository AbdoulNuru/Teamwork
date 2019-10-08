import auth from '../helpers/authenticate';

const employee = req => {
  const emp = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: auth.hashPassword(req.body.password),
    gender: req.body.gender,
    department: req.body.department,
    address: req.body.address
  };
  return emp;
};

export default employee;
