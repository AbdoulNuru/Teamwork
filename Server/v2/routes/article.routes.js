import Router from 'express';
import artController from '../controller/articleController';
import isLogged from '../middleware/isLoggedIn';

const routes = Router();

routes.post('/articles', isLogged, artController.createArticle);
routes.delete('/articles/:articleId', isLogged, artController.deleteArticle);

export default routes;
