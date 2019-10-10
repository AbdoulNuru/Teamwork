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
<<<<<<< HEAD
<<<<<<< HEAD
const findOneToUpdate = `select articleId, title, article, category, createdOn,
                        createdBy from articles where articleid=($1)`;
const findAuthor = `select employeeid, firstname, email, jobRole, department 
                    from employee where employeeid=($1)`;
const updateArticle = `update articles set title=($1), article=($2) 
                      where articleid=($3) RETURNING *`;
=======
const findOneToDelete = `select articleId, title, article, category, createdOn,
                        createdBy from articles where articleid=($1)`;
const findAuthor = `select employeeid, firstname, email, jobRole, department 
                    from employee where employeeid=($1)`;
const deleteArticle = `delete from articles where articleid = ($1)`;
>>>>>>> ft(endpoint): build delete article endpoint with database [Finishes #169054551]
=======
const findOneToDelete = `select articleId, title, article, category, createdOn,
                        createdBy from articles where articleid=($1)`;
const findAuthor = `select employeeid, firstname, email, jobRole, department 
                    from employee where employeeid=($1)`;
const deleteArticle = `delete from articles where articleid = ($1)`;
>>>>>>> 72d07059a6ac166e039c24eccc4af5858916dd92

export default {
  createArticle,
  findOneArticle,
  findAuthor,
<<<<<<< HEAD
<<<<<<< HEAD
  updateArticle,
  findOneToUpdate
=======
  findOneToDelete,
  deleteArticle
>>>>>>> ft(endpoint): build delete article endpoint with database [Finishes #169054551]
=======
  findOneToDelete,
  deleteArticle
>>>>>>> 72d07059a6ac166e039c24eccc4af5858916dd92
};
