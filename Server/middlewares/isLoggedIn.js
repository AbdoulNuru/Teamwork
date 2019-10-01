import jwt from 'jsonwebtoken';
import employees from '../models/employee.db'

const isLoggedIn = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(
              token, process.env.SECRET
        );
        const valid = employees.find(emp => emp.id === verify.id);

        if(valid){
            req.user = verify;
            next();
        }else{
            res.status(401).json({
              status: 401,
              error: "Authentication failed"
            });
        } 
    }catch(error){
        res.status(401).json({
            status: 401,
            error: 'Authentication failed'
        })
    } 
};

export default isLoggedIn;