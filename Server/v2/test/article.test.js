import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import tkn from '../helpers/authenticate';

Chai.use(chaiHttp);
Chai.should();

const eml = 'karen@gmail.com';
const eml2 = 'karen2@gmail.com';
const rt =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const article = {
  title: 'Learn to play piano in few days',
  article:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  category: 'music'
};

const article2 = {
  title: 'How to cook rice',
  category: 'music'
};

const token = tkn.generateToken(eml, 1);
const wrongToken = tkn.generateToken(eml2, 35);

describe('Teamwork article with database', () => {
  it('Should create an article', done => {
    Chai.request(app)
      .post('/api/v2/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(article)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property(
          'message',
          'Article created successfully'
        );
        res.body.data.should.have.property('title', article.title);
        res.body.data.should.have.property('articleid');
        res.body.data.should.have.property('category', article.category);
        done();
      });
  });

  it('Should not create an article if the owner of the token is no longer there', done => {
    Chai.request(app)
      .post('/api/v2/articles')
      .set('Authorization', `Bearer ${wrongToken}`)
      .send(article)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Authentication failed');
        done();
      });
  });

  it('Should not create an article if the token is invalid', done => {
    Chai.request(app)
      .post('/api/v2/articles')
      .set('Authorization', 'Bearer wekdjghghjfgewfygwufuf')
      .send(article)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Authentication failed');
        done();
      });
  });

  it('Should not create an article if there are validation errors', done => {
    Chai.request(app)
      .post('/api/v2/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(article2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should update an existing article', done => {
    Chai.request(app)
      .patch(`/api/v2/articles/${1}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'new one', article: rt })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property(
          'message',
          'Article modified successfully'
        );
        res.body.data.should.have.property('title', 'new one');
        res.body.data.should.have.property('article', rt);
        done();
      });
  });

  it('Should update an existing article', done => {
    Chai.request(app)
      .patch(`/api/v2/articles/${2}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'new one', article: rt })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          'error',
          'The article you are trying to edit is not found or you do not own it'
        );
        done();
      });
  });

  it("Should not delete an article that don't exist", done => {
    Chai.request(app)
      .delete(`/api/v2/articles/${78}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property(
          'error',
          'Article not found or you dont own the article'
        );
        done();
      });
  });
});
