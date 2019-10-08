/* eslint-disable consistent-return */
import comment from '../models/comment.model';
import comments from '../models/comment.db';
import articles from '../models/article.db';

class commentController {
  static createComment(req, res) {
    const articleId = parseInt(req.params.articleId, 10);
    if (typeof req.body.comment !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Comment is required and must be a string'
      });
    }
    const artExist = articles.find(art => art.id === articleId);
    if (!artExist) {
      res.status(404).json({
        status: 404,
        error: "you can't comment on unexisting article!"
      });
    } else {
      comments.push(comment(req));
      const comm = comments.find(c => c.id === comments.length);
      res.status(201).json({
        status: 201,
        message: 'comment added successfully',
        data: {
          createdOn: comm.createdOn,
          articleTitle: artExist.title,
          article: artExist.article,
          comment: comm.comment
        }
      });
    }
  }
}

export default commentController;
