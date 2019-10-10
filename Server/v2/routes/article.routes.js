import Router from 'express';
import artController from '../controller/articleController';
import isLogged from '../middleware/isLoggedIn';

const routes = Router();

routes.post('/articles', isLogged, artController.createArticle);
routes.delete('/articles/:articleId', isLogged, artController.deleteArticle);
routes.patch('/articles/:articleId', isLogged, artController.modifyArticle);
routes.get('/articles/:articleId', isLogged, artController.viewOneArticle);
routes.get('/feeds', isLogged, artController.viewAll);

export default routes;
