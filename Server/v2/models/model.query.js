const userTable = `
    CREATE TABLE IF NOT EXISTS employee (
                employeeId UUID PRIMARY KEY,
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
                articleId UUID PRIMARY KEY,
                title text,
                article text,
                createdOn date,
                createdBy UUID,
                foreign key(createdBy) REFERENCES employee ON DELETE CASCADE)`;

const deleteTable = `DROP TABLE IF EXISTS employee, articles CASCADE;`;

export default {
  userTable,
  articleTable,
  deleteTable
};
