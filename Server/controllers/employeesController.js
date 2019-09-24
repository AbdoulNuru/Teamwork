import employees from '../models/employee.db';
import employee from '../models/employee.model';
import Auth from '../helpers/authenticate';
import validation from '../helpers/employeeValidation';

class employeeController{
    static createAccount(req, res){
        let {error} = validation(employee(req));

        if(error){
            return res.status(422).json({
                status: 422,
                error: error.details[0].message.replace(/"/g, "")
            });
        }

        const exist = employees.find(emp => emp.email === req.body.email);
        if(exist){
            res.status(409).json({
                status: 409,
                error: 'The provided email already exist'
            });
        }else{
            employees.push(employee(req));
            res.status(201).json({
                status: 201,
                message: 'User created successfully',
                data: employee(req),
                token: Auth.generateToken(employee.email, employee.id)
            });
        }
    }
}

export default employeeController;