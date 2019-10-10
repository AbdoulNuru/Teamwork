import conn from '../config/project.config';
import commentQuery from '../models/comment.query';
import articleQuery from '../models/article.query';

class commentController {
  static async createComment(req, res) {
    const loggedAs = req.user.employeeId;
    const comm = req.body.comment;
    const aId = parseInt(req.params.articleId, 10);
    const aExist = await conn.query(articleQuery.findOneArticle, [aId]);

    if (typeof req.body.comment === 'undefined') {
      return res.status(400).json({
        status: 400,
        error: 'The comment can not be empty'
      });
    }
    if (aExist.rowCount > 0) {
      const save = await conn.query(commentQuery.createComment, [
        comm,
        loggedAs,
        aId
      ]);
      return res.status(201).json({
        status: 201,
        message: 'Comment created',
        data: save.rows[0]
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'The article you are trying to comment on is not found'
    });
  }
}

export default commentController;
