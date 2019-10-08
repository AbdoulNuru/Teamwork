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
}

export default employeeController;
