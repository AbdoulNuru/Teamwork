import employees from '../models/employee.db';
import employee from '../models/employee.model';
import Auth from '../helpers/authenticate';
import validation from '../helpers/employeeValidation';

class employeeController{
    static createAccount(req, res){
        let {error} = validation(employee(req));

        if(error){
            return res.status(400).json({
                status: 400,
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
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    gender: req.body.gender,
                    jobRole: req.body.jobRole,
                    department: req.body.department,
                    address: req.body.address
                },
                token: Auth.generateToken(req.body.email, employees.length)
            });
        }
    }

    static login(req, res){
        const account = employees.find(acc => acc.email === req.body.email);
        if(!account){
            return res.status(401).json({
                status: 401,
                error: 'It seems like you don\'t have an account, signup instead!!'
            });
        }else{
            const verifyPassword = Auth.checkPassword(
              req.body.password,
              account.password
            );
            if(verifyPassword){
                return res.status(200).json({
                    status: 200,
                    message: 'You have successfully logged in',
                    token: Auth.generateToken(account.email, account.id)
                });
            }else{
                res.status(401).json({
                    status: 401,
                    error: 'Authentication failed'
                });
            }
        }
    }
}

export default employeeController;