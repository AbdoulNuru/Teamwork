import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

Chai.should();
Chai.use(chaiHttp);

const emp = {
    id: 10,
    firstname: "Nuru",
    lastname: "Diouf",
    email: "nuru@gmail.com",
    password: "password",
    gender: "Male",
    jobRole: "Manager",
    department: "IT",
    address: "KK 390 st"
};

const emp2 = {
    id: 12,
    firstname: "Nuru",
    lastname: "Diouf",
    email: "nuru@gmail.com",
    password: "password",
    gender: "Male",
    jobRole: "Manager",
    department: "IT",
    address: "KK 390 st"
};

const emp3 = {
    id: 12,
    lastname: "Diouf",
    email: "nuru@gmail.com",
    password: "password",
    gender: "Male",
    jobRole: "Manager",
    department: "IT",
    address: "KK 390 st"
};

describe('Teamwork', ()=>{
    it('should create a new user account', (done)=>{
        Chai.request(app)
            .post('/api/v1/auth/signup')
            .send(emp)
            .end((err, res)=>{
                res.should.have.status(201);
                res.body.should.have
                   .property('message', 'User created successfully');
                res.body.should.be.a('object');   
            done();    
            });
    });

    it('should not create a new user if email exist', (done)=>{
        Chai.request(app)
            .post('/api/v1/auth/signup')
            .send(emp2)
            .end((err, res)=>{
                res.should.have.status(409);
                res.body.should.have
                   .property('error', 'The provided email already exist');   
            done();    
            });
    });

    it('should not create a new user if there is a validation error', (done) => {
        Chai.request(app)
            .post('/api/v1/auth/signup')
            .send(emp3)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.have.property('error');
                done();
            });
    });
});

