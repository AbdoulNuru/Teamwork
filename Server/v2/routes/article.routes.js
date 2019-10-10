import Router from 'express';
import artController from '../controller/articleController';
import isLogged from '../middleware/isLoggedIn';

const routes = Router();

routes.post('/articles', isLogged, artController.createArticle);
<<<<<<< HEAD
routes.patch('/articles/:articleId', isLogged, artController.modifyArticle);
=======
routes.delete('/articles/:articleId', isLogged, artController.deleteArticle);
>>>>>>> ft(endpoint): build delete article endpoint with database [Finishes #169054551]

export default routes;
