import Router from 'express';
import userController from '../controllers/employeesController';

const routes = Router();

routes.post('/api/v1/auth/signup', userController.createAccount);
//routes.post('/api/v1/auth/login',);

export default routes;