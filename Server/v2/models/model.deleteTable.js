/* eslint-disable prefer-destructuring */
import connection from '../config/project.config';
import model from './model.query';

const deleteTables = async () => {
  const deleteTable = model.deleteTable;
  const tables = `${deleteTable}`;

  await connection.query(tables);
};

deleteTables();

export default deleteTables;
