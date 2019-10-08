import model from './model.query';
import connection from '../config/project.config';

const createTables = async () => {
  const createUserTable = model.userTable;
  const createArticleTable = model.articleTable;
  const tables = `${createUserTable}; ${createArticleTable}`;

  await connection.query(tables);
};

createTables();

export default createTables;
