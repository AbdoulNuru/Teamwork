import employees from './employee.db';
import auth from '../helpers/authenticate'

const employee = (req)=>{
        const employee = {
            id:         employees.length + 1,
            firstname:  req.body.firstname,
            lastname:   req.body.lastname,
            email:      req.body.email,
            password:   auth.hashPassword(req.body.password),
            gender:     req.body.gender,
            jobRole:    req.body.jobRole,
            department: req.body.department,
            address:    req.body.address
        };
        return employee;       
    }

export default employee;