import articles from '../models/article.db';
import article from '../models/article.model';
import validation from '../helpers/articleValidation';

class articlesController{
    static createArticle(req, res){
        let {error} = validation(article(req));

        if(error){
            return res.status(400).json({
                status: 400,
                error: error.details[0].message.replace(/"/g, "")
            });
        }

        const articleExist = articles.find(
            article => article.title === req.body.title);
        
        if(articleExist){
            res.status(409).json({
                status: 409,
                error: 'The article already exist'
            });
        }else{
            articles.push(article(req));
            const art = articles.find(art => art.id === articles.length);
            res.status(201).json({
                status: 201,
                message: 'article successfully created',
                data: {
                    createdOn: art.createdOn,
                    title: art.title,
                    article: art.article
                }
            });
        }    
    }
}

export default articlesController;