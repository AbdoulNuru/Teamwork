import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Auth {
  static generateToken(email, employeeId) {
    return jwt.sign({ email, employeeId }, process.env.SECRET);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default Auth;
