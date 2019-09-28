import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import articleRoutes from './routes/articles.route';
import commentRoutes from './routes/comments.route';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(articleRoutes);
app.use(commentRoutes);

export default app;
