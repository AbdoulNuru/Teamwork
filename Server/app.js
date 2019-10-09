import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './v1/routes/auth.route';
import articleRoutes from './v1/routes/articles.route';
import commentRoutes from './v1/routes/comments.route';
import empRoutes from './v2/routes/auth.routes';
import artRoutes from './v2/routes/article.routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', authRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v2', empRoutes);
app.use('/api/v2', artRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Teamwork' });
});

app.use((req, res, next) => {
  const error = new Error('There was an error');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => {
  console.log(`Teamwork Server running on ${port}`);
});

export default app;
