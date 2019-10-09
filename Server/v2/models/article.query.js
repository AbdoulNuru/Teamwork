const createArticle = ` insert into articles (
        title,
        article,
        category,
        createdOn,
        modifiedOn,
        createdBy
    ) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING returning *`;

const findOneArticle = `select articleId, title, article, category, createdOn
                        from articles where articleid=($1)`;
const findOneToUpdate = `select articleId, title, article, category, createdOn,
                        createdBy from articles where articleid=($1)`;
const findAuthor = `select employeeid, firstname, email, jobRole, department 
                    from employee where employeeid=($1)`;
const updateArticle = `update articles set title=($1), article=($2) 
                      where articleid=($3) RETURNING *`;

export default {
  createArticle,
  findOneArticle,
  findAuthor,
  updateArticle,
  findOneToUpdate
};
