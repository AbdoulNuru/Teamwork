const createUser = ` insert into employee (
        firstname,
        lastname,
        email,
        password,
        gender,
        jobRole,
        department, 
        address
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING returning *`;

const findOne = `select employeeid, firstname, lastname, email, gender, 
            jobRole, department, address from employee where email=($1)`;
const findOneLogin = `select employeeId, firstname, email, password, 
            jobRole, department, address from employee where email=($1)`;
const findOneLgn = `select employeeid, firstname, email, jobRole, 
            department, address from employee where email=($1)`;

export default { createUser, findOne, findOneLogin, findOneLgn };
