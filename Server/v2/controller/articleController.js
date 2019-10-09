import moment from 'moment';
import conn from '../config/project.config';
import articleQuery from '../models/article.query';
import validate from '../helpers/articleValidation';
import arti from '../models/article.model';

class articleController {
  static async createArticle(req, res) {
    const { title, article, category, modifiedOn } = req.body;
    const createdOn = moment().format('YYYY-MM-DD HH:mm:s');
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
      createdOn,
      modifiedOn,
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

  static async modifyArticle(req, res) {
    const articleId = parseInt(req.params.articleId, 10);
    const loggedIn = req.user.employeeId;
    const { title, article } = req.body;
    const articleExist = await conn.query(articleQuery.findOneToUpdate, [
      articleId
    ]);

    if (typeof title === 'undefined' || typeof article === 'undefined') {
      return res.status(400).json({
        status: 400,
        error: 'The fields can not be updated to null'
      });
    }

    const newTitle = title;
    const newArticle = article;
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

    return res.status(404).json({
      status: 404,
      error:
        'The article you are trying to edit is not found or you do not own it'
    });
  }
}

export default articleController;
