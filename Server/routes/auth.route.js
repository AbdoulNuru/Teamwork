import Router from 'express';
import userController from '../controllers/employeesController';

const routes = Router();

routes.post('/api/v1/auth/signup', userController.createAccount);
routes.post('/api/v1/auth/signin', userController.login);

export default routes;