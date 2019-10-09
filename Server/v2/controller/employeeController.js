/* eslint-disable consistent-return */
import uuid from 'uuid/v1';
import conn from '../config/project.config';
import help1 from '../helpers/authenticate';
import userQuery from '../models/user.query';
import validation from '../helpers/employeeValidation';
import employee from '../models/employee.model';

class employeeController {
  static async createEmployee(req, res) {
    const { error } = validation(employee(req));

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, '')
      });
    }

    const {
      firstname,
      lastname,
      email,
      gender,
      jobRole,
      department,
      address
    } = req.body;
    const password = help1.hashPassword(req.body.password);
    const employeeId = uuid();

    const add = await conn.query(userQuery.createUser, [
      employeeId,
      firstname,
      lastname,
      email,
      password,
      gender,
      jobRole,
      department,
      address
    ]);

    if (add.rowCount === 1) {
      const saved = await conn.query(userQuery.findOne, [email]);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: saved.rows[0],
        token: help1.generateToken(email, employeeId)
      });
    }

    return res.status(409).json({
      status: 409,
      error: 'Email already exist!!'
    });
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    const exist = await conn.query(userQuery.findOneLogin, [email]);
    const display = await conn.query(userQuery.findOneLgn, [email]);

    if (exist.rowCount > 0) {
      const compare = help1.checkPassword(password, exist.rows[0].password);
      if (compare) {
        return res.status(200).json({
          status: 200,
          message: `${exist.rows[0].email} is successfully logged in`,
          token: help1.generateToken(
            exist.rows[0].email,
            exist.rows[0].employeeId
          ),
          data: display.rows[0]
        });
      }
    }

    return res.status(404).json({
      status: 404,
      error: "It seems like you don't have an account, sign up instead"
    });
  }
}

export default employeeController;
