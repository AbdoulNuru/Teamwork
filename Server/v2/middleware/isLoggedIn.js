import jwt from 'jsonwebtoken';
import conn from '../config/project.config';
import userQuery from '../models/user.query';

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.SECRET);
    const validUser = await conn.query(userQuery.findOne, [verify.email]);

    if (validUser.rowCount > 0) {
      req.user = verify;
      next();
    } else {
      res.status(401).json({
        status: 401,
        error: 'Authentication failed'
      });
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed'
    });
  }

  return isLoggedIn;
};

export default isLoggedIn;
