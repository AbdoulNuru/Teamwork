import Router from 'express';
import articlesController from '../controllers/articlesController';
import isLoggedIn from '../middlewares/isLoggedIn';

const routes = Router();

routes.post('/api/v1/articles', isLoggedIn, articlesController.createArticle);

export default routes;