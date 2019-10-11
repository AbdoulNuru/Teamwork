const createArticle = ` insert into articles (
        title,
        article,
        category,
        createdBy
    ) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING returning *`;

const findOneArticle = `select articleId, title, article, category, createdOn
                        from articles where articleid=($1)`;
const findOneToUpdate = `select articleId, title, article, category, createdOn,
                        createdBy from articles where articleid=($1)`;
const findAuthor = `select employeeid, firstname, email, jobRole, department 
                    from employee where employeeid=($1)`;
const updateArticle = `update articles set title=($1), article=($2) 
                      where articleid=($3) RETURNING *`;
const findOneToDelete = `select articleId, title, article, category, createdOn,
                        createdBy from articles where articleid=($1)`;
const deleteArticle = `delete from articles where articleid = ($1)`;
const allArticles = `select * from articles order by createdon desc`;
const allByCategory = `select * from articles where category=($1)`;

export default {
  createArticle,
  findOneArticle,
  findAuthor,
  findOneToUpdate,
  updateArticle,
  findOneToDelete,
  deleteArticle,
  allArticles,
  allByCategory
};
