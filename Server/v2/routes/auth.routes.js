import Router from 'express';
import empController from '../controller/employeeController';

const routes = Router();

routes.post('/auth/signup', empController.createEmployee);
routes.post('/auth/signin', empController.userLogin);

export default routes;
