const userTable = `
    CREATE TABLE IF NOT EXISTS employee (
                employeeId SERIAL PRIMARY KEY,
                firstName text,
                lastName text,
                email text UNIQUE,
                password text,
                gender text,
                jobRole text,
                department text,
                address text)`;

const articleTable = `
        CREATE TABLE IF NOT EXISTS articles (
                articleId SERIAL PRIMARY KEY,
                title text,
                article text,
                category text,
                createdOn date,
                modifiedOn date,
                createdBy SERIAL,
                foreign key(createdBy) REFERENCES employee ON DELETE CASCADE)`;

const deleteTable = `DROP TABLE IF EXISTS employee, articles CASCADE;`;

export default {
  userTable,
  articleTable,
  deleteTable
};
