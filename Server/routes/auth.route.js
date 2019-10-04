import Router from 'express';
import userController from '../controllers/employeesController';

const routes = Router();

routes.post('/auth/signup', userController.createAccount);
routes.post('/auth/signin', userController.login);

export default routes;