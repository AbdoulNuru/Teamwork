import uuid from 'uuid/v1';
import moment from 'moment';
import conn from '../config/project.config';
import articleQuery from '../models/article.query';

class articleController {
  static async createArticle(req, res) {
    const { title, article, category, modifiedOn } = req.body;
    const createdOn = moment().format('YYYY-MM-DD HH:mm:s');
    const articleId = uuid();
    const createdBy = req.user.employeeId;

    const addArticle = await conn.query(articleQuery.createArticle, [
      articleId,
      title,
      article,
      category,
      createdOn,
      modifiedOn,
      createdBy
    ]);

    if (addArticle.rowCount === 1) {
      const added = await conn.query(articleQuery.findOneArticle, [articleId]);
      return res.status(201).json({
        status: 201,
        message: 'Article created successfully',
        data: added.rows[0]
      });
    }

    return res.status(400).json({
      status: 409,
      error: 'Article not created'
    });
  }
}

export default articleController;
