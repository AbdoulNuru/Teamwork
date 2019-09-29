import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

Chai.should();
Chai.use(chaiHttp);

const employeeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTU5ODIwNH0.OHD6tBY1uv_4U2y0r-uDBvfgAkg80Ex1ZTiJZAZS-dc";
const employeeWrongToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTQ1MDIzNX0.dBOpBVjapT-nuD79gIkrzY19Odol1ggmk7uyu5pJwg";
const employeeWrongToken2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Njk1OTg3OTh9.OJlBy5WLiKA68NIQyG96IeykzN4vwil6gRsa1GsRNO8";
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

const articleUpdate = {
  title: "New article",
  article: "Lorem Ipsum is simply dummy text."
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

    it("should get all articles, showing the most recent first 2", done => {
      Chai.request(app)
        .get("/api/v1/feeds")
        .set("Authorization", "Bearer " + employeeToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            "message",
            "It seems like there are no articles added yet!!"
          );
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

    it('should not create an article if a user is not logged in 2', (done) => {
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

    it('should not create an article if there are validation errors', (done) => {
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

    it('should not create an article if it already exist', (done) => {
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

    it('should edit an existing article', (done)=>{
      Chai.request(app)
          .patch('/api/v1/articles/'+ 1)
          .set('Authorization', 'Bearer '+ employeeToken)
          .send(articleUpdate)
          .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property(
              'message',
              'article successfully edited'
            );
            res.body.data.should.have.property('title', 'New article');
          done();  
          });
    });

    it("should edit an existing article 2", done => {
      Chai.request(app)
        .patch("/api/v1/articles/" + 1)
        .set("Authorization", "Bearer " + employeeToken)
        .send(article)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            "message",
            "article successfully edited"
          );
          res.body.data.should.have.property(
            "title",
            "Javascript best practices"
          );
          done();
        });
    });

    it("should not edit an article that don't exist", done => {
      Chai.request(app)
          .patch("/api/v1/articles/" + 100)
          .set("Authorization", "Bearer " + employeeToken)
          .send(articleUpdate)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property(
              "error",
              "No article found with given id"
            );
          done();
        });
    });

    it("should comment on colleagues articles", done => {
      const id = 1;
      Chai.request(app)
        .post("/api/v1/articles/" + id + "/comments")
        .set("Authorization", "Bearer " + employeeToken)
        .send({ comment: "Good article" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property(
            "message",
            "comment added successfully"
          );
          res.body.data.should.have.property(
            "comment",
            "Good article"
          );
          done();
        });
    });

    it('should get all articles, showing the most recent first 1', (done)=>{
      Chai.request(app)
          .get('/api/v1/feeds')
          .set('Authorization', 'Bearer '+ employeeToken)
          .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property(
              "message",
              "Articles successfully retrieved"
            );
            res.body.data[0].should.have.property('id');
          done();  
          });
    });

    it("should not comment on colleagues articles\
        if there is a validation error", done => {
      const id = 1;
      Chai.request(app)
        .post("/api/v1/articles/" + id + "/comments")
        .set("Authorization", "Bearer " + employeeToken)
        .send()
        .end((err, res) => {
          res.should.have.status(400);
        done();
        });
    });

    it('should delete an article i created if am logged in', (done)=>{
      const id = 1;
      Chai.request(app)
          .delete('/api/v1/articles/'+ id)
          .set('Authorization', 'Bearer '+ employeeToken)
          .end((err, res) => {
            res.should.have.status(204);
          done();  
          });
    });

    it("should not comment on unexisting article", done => {
      const id = 1;
      Chai.request(app)
        .post("/api/v1/articles/" + id + "/comments")
        .set("Authorization", "Bearer " + employeeToken)
        .send({ comment: "Good article" })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            "error",
            "you can't comment on unexisting article!"
          );
        done();
        });
    });

    it("should not delete an article if am not logged in or\
        don't own the article am trying to delete", (done) => {
          const id = 100;
          Chai.request(app)
              .delete('/api/v1/articles/'+ id)
              .set('Authorization', 'Bearer '+ employeeToken)
              .end((err, res)=>{
                res.should.have.status(404);
                res.body.should.have.property(
                  "error",
                  "No article found with given id"
                );
              done();  
              });
        });
});

