import Hapi from '@hapi/joi';

const validation = (employee)=>{
    let Schema = Hapi.object({
        id:         Hapi.number().required(),
        firstname:  Hapi.string().required(),
        lastname:   Hapi.string().required(),
        email:      Hapi.string().email().required(),
        password:   Hapi.string().required(),
        gender:     Hapi.string().required(),
        jobRole:    Hapi.string().required(),
        department: Hapi.string().required(),
        address:    Hapi.string().required(),  
    });

    return Schema.validate(employee);
};

export default validation;