import comments from './comment.db';

const comment = (req) => {
    const comment = {
      id: comments.length + 1,
      comment: req.body.comment,
      articleId: parseInt(req.params.articleId, 10),
      commentedBy: req.user.id,
      createdOn: new Date().toDateString()
    };
    return comment; 
};

export default comment;