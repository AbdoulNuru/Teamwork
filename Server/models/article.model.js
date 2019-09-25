import articles from './article.db';

const article = (req)=> {
    const article = {
        id: articles.length + 1,
        title: req.body.title,
        article: req.body.article,
        createdOn: new Date().toDateString(),
        createdBy: req.user.id
    };
    return article;
};

export default article;