import comments from './comment.db';

const comment = (req) => {
    const comment = {
      id: comments.length + 1,
      comment: req.body.comment,
      articleId: req.params.articleId,
      commentedBy: req.user.id,
      createdOn: new Date().toDateString()
    };
    return comment; 
};

export default comment;