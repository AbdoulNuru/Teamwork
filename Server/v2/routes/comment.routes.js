import Router from 'express';
import isLogged from '../middleware/isLoggedIn';
import commentController from '../controller/commentController';

const routes = Router();

routes.post(
  '/articles/:articleId/comments',
  isLogged,
  commentController.createComment
);

export default routes;
