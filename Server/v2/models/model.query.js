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
                createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedOn date,
                createdBy SERIAL,
                foreign key(createdBy) REFERENCES employee ON DELETE CASCADE)`;

const commentTable = `
        CREATE TABLE IF NOT EXISTS comments (
                commentId SERIAL PRIMARY KEY,
                comment text,
                commentedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                commentedBy SERIAL,
                articleCommented SERIAL,
                foreign key(commentedBy) REFERENCES employee,
                foreign key(articleCommented) REFERENCES articles ON DELETE CASCADE)`;

const deleteTable = `DROP TABLE IF EXISTS employee, articles, comments CASCADE;`;

export default {
  userTable,
  articleTable,
  commentTable,
  deleteTable
};
