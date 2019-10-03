import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

Chai.should();
Chai.use(chaiHttp);

const employeeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXZhcmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2OTU5ODIwNH0.OHD6tBY1uv_4U2y0r-uDBvfgAkg80Ex1ZTiJZAZS-dc";

describe('Teamwork', ()=>{
    
    it("should not allow wrong urls", done => {
      const id = 1;
      Chai.request(app)
        .delete("/api/v21/articles/" + id)
        .set("Authorization", "Bearer " + employeeToken)
        .end((err, res) => {
          res.should.have.status(404);
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

    it("should not get a specific article, if doesn't exist", done => {
      const id = 1;
      Chai.request(app)
        .get("/api/v1/articles/" + id)
        .set("Authorization", "Bearer " + employeeToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            "error",
            "No article found with the given id"
          );
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

