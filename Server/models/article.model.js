import articles from './article.db';
import moment from 'moment'

const article = (req)=> {
    const article = {
        id: articles.length + 1,
        title: req.body.title,
        article: req.body.article,
        createdOn: moment().format('YYYY-MM-DD HH:mm:s'),
        createdBy: req.user.id
    };
    return article;
};

export default article;