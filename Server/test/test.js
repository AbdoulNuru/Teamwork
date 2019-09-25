import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

Chai.should();
Chai.use(chaiHttp);

const employeeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTQ1MDIzNX0.dBOpBVjapT-nuuD79gIkrzY19Odol1ggmk7uyu5pJwg";
const employeeWrongToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTQ1MDIzNX0.dBOpBVjapT-nuD79gIkrzY19Odol1ggmk7uyu5pJwg";
const employeeWrongToken2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Njk0NTE4Mjl9.0qi7aEjAjBQPIondJbmaXIpBvlglfwY2VyuGNZE0nAo";
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
    password: "password1",
    gender: "Male",
    jobRole: "Manager",
    department: "IT",
    address: "KK 390 st"
};

const emp3 = {
    id: 12,
    lastname: "Diouf",
    email: "nuru1@gmail.com",
    password: "password1",
    gender: "Male",
    jobRole: "Manager",
    department: "IT",
    address: "KK 390 st"
};

const article = {
  title: 'Javascript best practices',
  article: 'Lorem Ipsum is simply dummy text of the printing.',
};
const article2 = {
  title: 2,
  article: "Lorem Ipsum is simply dummy text of the printing."
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
                res.should.have.status(400);
                res.body.should.have.property('error');
                done();
            });
    });

    it('should signin a user with an account', (done)=>{
        Chai.request(app)
          .post("/api/v1/auth/signin")
          .send({ email: emp.email, password: emp.password})
          .end((err, res)=>{
              res.should.have.status(200);
              res.body.should.have.property('token');
              res.body.should.have.property(
                "message",
                "You have successfully logged in"
              );
            done();  
          });
    });

    it('should not signin a user who don\'t have an account', (done)=>{
        Chai.request(app)
            .post('/api/v1/auth/signin')
            .send({email: emp3.email, password: emp3.password})
            .end((err, res)=>{
                res.should.have.status(401);
                res.body.should.have.property(
                  "error",
                  "It seems like you don't have an account, signup instead!!"
                );
              done();   
            });
    });

    it('should not signin a user if authentication failed', (done)=>{
        Chai.request(app)
            .post('/api/v1/auth/signin')
            .send({email: emp2.email, password: emp2.password})
            .end((err, res)=>{
                res.should.have.status(401);
                res.body.should.have.property("error", "Authentication failed");
              done();  
            });
    });

    it('should create a new article if a user is logged in', (done)=>{
        Chai.request(app)
            .post('/api/v1/articles')
            .set('Authorization', 'Bearer '+ employeeToken)
            .send(article)
            .end((err, res)=>{
                res.should.have.status(201);
                res.body.should.have.property(
                  "message",
                  "article successfully created"
                );
                res.body.data.should.have.property(
                  "title",
                  "Javascript best practices"
                );
              done();  
            });
    });

    it('should not create an article if a user is not logged in', (done)=>{
        Chai.request(app)
            .post("/api/v1/articles")
            .set("Authorization", "Bearer " + employeeWrongToken)
            .send(article)
            .end((err, res)=>{
                res.should.have.status(401);
                res.body.should.have.property("error", "Authentication failed");
              done();  
            });
    });

    it("should not create an article if a user is not logged in 2", done => {
      Chai.request(app)
          .post("/api/v1/articles")
          .set("Authorization", "Bearer " + employeeWrongToken2)
          .send(article)
          .end((err, res) => {
               res.should.have.status(401);
               res.body.should.have.property("error", "Authentication failed");
            done();
        });
    });

    it("should not create an article if there are validation errors", done => {
      Chai.request(app)
        .post("/api/v1/articles")
        .set("Authorization", "Bearer " + employeeToken)
        .send(article2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          done();
        });
    });

    it("should not create an article if it already exist", done => {
      Chai.request(app)
        .post("/api/v1/articles")
        .set("Authorization", "Bearer " + employeeToken)
        .send(article)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property("error", "The article already exist");
          done();
        });
    });
});

