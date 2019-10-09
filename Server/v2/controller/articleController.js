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
      const added = await conn.query(articleQuery.findOneArticle, [title]);
      const author = await conn.query(articleQuery.findAuthor, [createdBy]);
      return res.status(201).json({
        status: 201,
        message: 'Article created successfully',
        data: added.rows[0],
        author: author.rows[0]
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Article not created'
    });
  }
}

export default articleController;
