import articles from '../models/article.db';
import article from '../models/article.model';
import articleValidation from '../helpers/articleValidation';
import comments from '../models/comment.db';

class articlesController {
  static createArticle(req, res) {
    let { error } = articleValidation(article(req));
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, "")
      });
    }
    
    const articleExist = articles.find(
      article => article.title === req.body.title );
    if (articleExist) {
      res.status(409).json({
        status: 409,
        error: "The article already exist"
      });
    } else {
      articles.push(article(req));
      const art = articles.find(art => art.id === articles.length);
      res.status(201).json({ status: 201,
        message: "article successfully created",
        data: {
          createdOn: art.createdOn, title: art.title, article: art.article
        }
      });
    }
  }

  static modifyArticle(req, res) {
    const id = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const article = articles.find(article => article.id === id);

    if (article && userId === article.createdBy) {
      article.title = req.body.title;
      article.article = req.body.article;

      return res.status(200).json({
        status: 200,
        message: "article successfully edited",
        data: {
          title: article.title,
          article: article.article
        }
      });
    }
    res.status(404).json({
      status: 404,
      error: "No article found with given id"
    });
  }

  static deleteArticle(req, res) {
    const id = parseInt(req.params.id);
    const createdBy = req.user.id;
    const articleExist = articles.find(article => article.id === id);

    if (articleExist && articleExist.id === createdBy) {
      articles.splice(articles.indexOf(articleExist), 1);
      return res.sendStatus(204);
    }

    res.status(404).json({
      status: 404,
      error: "No article found with given id"
    });
  }

  static viewAllArticles(req, res){
    const sorted = articles.sort((x, y)=> 
                   new Date(y.createdOn) - new Date(x.createdOn));
    if(sorted.length === 0){
      return res.status(200).json({
        status: 200,
        message: 'It seems like there are no articles added yet!!'
      });
    } else{
      res.status(200).json({
        status: 200,
        message: "Articles successfully retrieved",
        data: sorted
      });
    }              
  }

  static viewSpecificArticle(req, res){
    const artId = parseInt(req.params.id, 10);
    const Article = articles.find(a => a.id === artId);
    let artComments = comments.filter(c => c.articleId === artId);

    if(!Article){
      return res.status(404).json({
        status: 404,
        error: 'No article found with the given id'
      });
    }else{
      res.status(200).json({
        status: 200,
        data: {
          Article,
          comments: artComments
        } 
      });
    }
  }
}

export default articlesController;