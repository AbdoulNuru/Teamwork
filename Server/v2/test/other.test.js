import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import tkn from '../helpers/authenticate';

Chai.use(chaiHttp);
Chai.should();

const mail = 'karen@gmail.com';
const tk = tkn.generateToken(mail, 1);

describe('Teamwork articles with database', () => {
  it('Should delete an article', done => {
    Chai.request(app)
      .delete(`/api/v2/articles/${1}`)
      .set('Authorization', `Bearer ${tk}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Article deleted');
        res.body.data.should.have.property('articleid', 1);
        res.body.data.should.have.property('category', 'music');
        done();
      });
  });
});
