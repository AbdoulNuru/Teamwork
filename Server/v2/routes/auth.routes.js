import Router from 'express';
import empController from '../controller/employeeController';

const routes = Router();

routes.post('/auth/signup', empController.createEmployee);

export default routes;
