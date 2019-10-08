import Router from 'express';
import articlesController from '../controllers/articlesController';
import isLoggedIn from '../middlewares/isLoggedIn';

const routes = Router();
//routes.all('*', isLoggedIn)
routes.post('/articles', isLoggedIn, articlesController.createArticle);
routes.patch("/articles/:id", isLoggedIn, articlesController.modifyArticle);
routes.delete('/articles/:id', isLoggedIn, articlesController.deleteArticle);
routes.get("/feeds", isLoggedIn, articlesController.viewAllArticles);
routes.get("/articles/:id", isLoggedIn, articlesController.viewSpecificArticle);

export default routes;