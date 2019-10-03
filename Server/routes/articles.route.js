import Router from 'express';
import articlesController from '../controllers/articlesController';
import isLoggedIn from '../middlewares/isLoggedIn';

const routes = Router();
routes.all('*', isLoggedIn)
routes.post('/articles', articlesController.createArticle);
routes.patch('/articles/:id', articlesController.modifyArticle);
routes.delete('/articles/:id', articlesController.deleteArticle);
routes.get('/feeds', articlesController.viewAllArticles);
routes.get('/articles/:id', articlesController.viewSpecificArticle);

export default routes;