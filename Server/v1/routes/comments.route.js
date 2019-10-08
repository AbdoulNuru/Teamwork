import Router from 'express';
import commentsController from '../controllers/commentsController';
import isLoggedIn from '../middlewares/isLoggedIn';

const routes = Router();

routes.post('/articles/:articleId/comments', isLoggedIn, 
                            commentsController.createComment);

export default routes;