/* eslint-disable no-unused-vars */
import conn from '../config/project.config';
import articleQuery from '../models/article.query';
import validate from '../helpers/articleValidation';
import arti from '../models/article.model';
import commentQuery from '../models/comment.query';

class articleController {
  static async createArticle(req, res) {
    const { title, article, category } = req.body;
    const createdBy = req.user.employeeId;

    const { error } = validate(arti(req));
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, '')
      });
    }

    const addArticle = await conn.query(articleQuery.createArticle, [
      title,
      article,
      category,
      createdBy
    ]);

    if (addArticle.rowCount === 1) {
      const added = await conn.query(articleQuery.findOneArticle, [
        addArticle.rows[0].articleid
      ]);
      const author = await conn.query(articleQuery.findAuthor, [createdBy]);
      return res.status(201).json({
        status: 201,
        message: 'Article created successfully',
        data: added.rows[0],
        author: author.rows[0]
      });
    }

    return addArticle;
  }

  static async deleteArticle(req, res) {
    const artId = parseInt(req.params.articleId, 10);
    const loggedAs = req.user.employeeId;
    const findArticle = await conn.query(articleQuery.findOneToDelete, [artId]);

    if (
      findArticle.rowCount > 0 &&
      findArticle.rows[0].createdby === loggedAs
    ) {
      await conn.query(articleQuery.deleteArticle, [artId]);
      return res.status(200).json({
        status: 200,
        message: 'Article deleted',
        data: findArticle.rows[0]
      });
    }

    return res.status(403).json({
      status: 403,
      error: 'Article not found or you dont own the article'
    });
  }

  static async modifyArticle(req, res) {
    const articleId = parseInt(req.params.articleId, 10);
    const loggedIn = req.user.employeeId;
    const { title, article } = req.body;
    const articleExist = await conn.query(articleQuery.findOneToUpdate, [
      articleId
    ]);
    const newTitle = title || articleExist.rows[0].title;
    const newArticle = article || articleExist.rows[0].article;
    const creator = await conn.query(articleQuery.findAuthor, [loggedIn]);
    if (
      articleExist.rowCount > 0 &&
      articleExist.rows[0].createdby === loggedIn
    ) {
      const updated = await conn.query(articleQuery.updateArticle, [
        newTitle,
        newArticle,
        articleId
      ]);

      const display1 = await conn.query(articleQuery.findOneArticle, [
        articleId
      ]);

      return res.status(200).json({
        status: 200,
        message: 'Article modified successfully',
        data: display1.rows[0],
        author: creator.rows[0]
      });
    }

    return res.status(403).json({
      status: 403,
      error:
        'The article you are trying to edit is not found or you do not own it'
    });
  }

  static async viewOneArticle(req, res) {
    const aId = parseInt(req.params.articleId, 10);
    const artFound = await conn.query(articleQuery.findOneToUpdate, [aId]);
    const comFound = await conn.query(commentQuery.fetchComment, [aId]);

    if (artFound.rowCount > 0) {
      return res.status(200).json({
        status: 200,
        message: 'Article retrieved successful',
        data: { articleDetails: artFound.rows[0], comments: comFound.rows }
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'No article found with the given id'
    });
  }

  static async viewAll(req, res) {
    const all = await conn.query(articleQuery.allArticles);

    if (all.rowCount > 0) {
      return res.status(200).json({
        status: 200,
        message: 'All articles retrieved',
        articles: all.rows
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'It seems like there are no articles yet'
    });
  }
}

export default articleController;
