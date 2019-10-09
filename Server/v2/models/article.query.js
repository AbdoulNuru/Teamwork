const createArticle = ` insert into articles (
        title,
        article,
        category,
        createdOn,
        modifiedOn,
        createdBy
    ) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING returning *`;

const findOneArticle = `select articleId, title, article, category, createdOn
                        from articles where title=($1)`;
const findAuthor = `select employeeid, firstname, email, jobRole, department 
                    from employee where employeeid=($1)`;

export default { createArticle, findOneArticle, findAuthor };
