import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import tkn from '../helpers/authenticate';

Chai.use(chaiHttp);
Chai.should();

const email = 'karen@gmail.com';
const tk = tkn.generateToken(email, 1);

describe('Teamwork comments with database', () => {
  it('Should comment on articles', done => {
    Chai.request(app)
      .post(`/api/v2/articles/${1}/comments`)
      .set('Authorization', `Bearer ${tk}`)
      .send({ comment: 'Woow!!!' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'Comment created');
        res.body.data.should.have.property('comment', 'Woow!!!');
        done();
      });
  });

  it('Should not comment on articles if there is a validation error', done => {
    Chai.request(app)
      .post(`/api/v2/articles/${1}/comments`)
      .set('Authorization', `Bearer ${tk}`)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'The comment can not be empty');
        done();
      });
  });
});
