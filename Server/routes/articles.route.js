import Router from 'express';
import articlesController from '../controllers/articlesController';
import isLoggedIn from '../middlewares/isLoggedIn';

const routes = Router();

routes.post('/api/v1/articles', isLoggedIn, articlesController.createArticle);
routes.patch('/api/v1/articles/:id', isLoggedIn, articlesController.modifyArticle);
routes.delete('/api/v1/articles/:id', isLoggedIn, articlesController.deleteArticle);
routes.get('/api/v1/feeds', isLoggedIn, articlesController.viewAllArticles);

export default routes;