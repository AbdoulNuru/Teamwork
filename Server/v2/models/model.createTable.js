import model from './model.query';
import connection from '../config/project.config';

const createTables = async () => {
  const createUserTable = model.userTable;
  const createArticleTable = model.articleTable;
  const createCommentTable = model.commentTable;
  const tables = `${createUserTable}; ${createArticleTable}; ${createCommentTable}`;

  await connection.query(tables);
};

createTables();

export default createTables;
