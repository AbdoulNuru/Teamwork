import Chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

Chai.should();
Chai.use(chaiHttp);

const employeeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTU5ODIwNH0.OHD6tBY1uv_4U2y0r-uDBvfgAkg80Ex1ZTiJZAZS-dc";


describe('Teamwork comments', ()=>{
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
          res.body.data.should.have.property("comment", "Good article");
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
});
