import Chai from 'chai';
import http from 'chai-http';
import uuid from 'uuid/v1';
import app from '../../app';

Chai.use(http);
Chai.should();

const emp = {
  employeeId: uuid(),
  firstname: 'Karen',
  lastname: 'Giramata',
  email: 'karen@gmail.com',
  password: 'karen123',
  gender: 'female',
  jobRole: 'Consultant',
  department: 'IT',
  address: 'KG 234 st'
};

const emp2 = {
  firstname: 'Karen',
  lastname: 'Giramata',
  email: 'karengmail.com',
  password: 'karen123',
  gender: 'Female',
  department: 'IT',
  address: 'KG 234 st'
};

describe('Teamwork with database', () => {
  it('Should create user account', done => {
    Chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emp)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'User created successfully');
        res.body.should.have.property('token');
        res.body.data.should.have.property('firstname', 'Karen');
        res.body.data.should.have.property('lastname', 'Giramata');
        res.body.data.should.have.property('email', 'karen@gmail.com');
        done();
      });
  });

  it('Should not create user account if account already exist', done => {
    Chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emp)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('error', 'Email already exist!!');
        done();
      });
  });

  it('Should not create user account if there are validation errors', done => {
    Chai.request(app)
      .post('/api/v2/auth/signup')
      .send(emp2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should login a user with an account', done => {
    Chai.request(app)
      .post('/api/v2/auth/signin')
      .send({ email: emp.email, password: emp.password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          'message',
          `${emp.email} is successfully logged in`
        );
        res.body.should.have.property('token');
        res.body.data.should.have.property('email', emp.email);
        res.body.data.should.have.property('firstname', emp.firstname);
        done();
      });
  });

  it('Should not login a user without an accoun or  with an incorrect password', done => {
    Chai.request(app)
      .post('/api/v2/auth/signin')
      .send({ email: 'kghh@gmail.com', password: 'karen123' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          'error',
          "It seems like you don't have an account, sign up instead"
        );
        done();
      });
  });
});
