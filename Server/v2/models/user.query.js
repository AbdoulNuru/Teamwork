const createUser = ` insert into employee (
        employeeId,
        firstname,
        lastname,
        email,
        password,
        gender,
        jobRole,
        department, 
        address
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING returning *`;

const findOne = `select employeeId, firstname, lastname, email, gender, 
            jobRole, department, address from employee where email=($1)`;

export default { createUser, findOne };
