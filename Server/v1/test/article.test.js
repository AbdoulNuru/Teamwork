import Chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

Chai.should();
Chai.use(chaiHttp);

const employeeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTU5ODIwNH0.OHD6tBY1uv_4U2y0r-uDBvfgAkg80Ex1ZTiJZAZS-dc";
const employeeWrongToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTQ1MDIzNX0.dBOpBVjapT-nuD79gIkrzY19Odol1ggmk7uyu5pJwg";
const employeeWrongToken2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Njk1OTg3OTh9.OJlBy5WLiKA68NIQyG96IeykzN4vwil6gRsa1GsRNO8";

const article = {
  title: "Javascript best practices",
  article: "Lorem Ipsum is simply dummy text of the printing."
};

const articleUpdate = {
  title: "New article",
  article: "Lorem Ipsum is simply dummy text."
};

const article2 = {
  title: 2,
  article: "Lorem Ipsum is simply dummy text of the printing."
};

describe('Teamwork articles', ()=>{
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

    it("should create a new article if a user is logged in", done => {
      Chai.request(app)
        .post("/api/v1/articles")
        .set("Authorization", "Bearer " + employeeToken)
        .send(article)
        .end((err, res) => {
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

    it("should not create an article if a user is not logged in", done => {
      Chai.request(app)
        .post("/api/v1/articles")
        .set("Authorization", "Bearer " + employeeWrongToken)
        .send(article)
        .end((err, res) => {
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

    it("should edit an existing article", done => {
      Chai.request(app)
        .patch("/api/v1/articles/" + 1)
        .set("Authorization", "Bearer " + employeeToken)
        .send(articleUpdate)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            "message",
            "article successfully edited"
          );
          res.body.data.should.have.property("title", "New article");
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

    it("should get all articles, showing the most recent first 1", done => {
      Chai.request(app)
        .get("/api/v1/feeds")
        .set("Authorization", "Bearer " + employeeToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            "message",
            "Articles successfully retrieved"
          );
          res.body.data[0].should.have.property("id");
          done();
        });
    });

    it("should get a specific article", done => {
      const id = 1;
      Chai.request(app)
        .get("/api/v1/articles/" + id)
        .set("Authorization", "Bearer " + employeeToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          done();
        });
    });
});

