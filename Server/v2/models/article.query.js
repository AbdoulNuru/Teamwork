const createArticle = ` insert into articles (
        articleId,
        title,
        article,
        category,
        createdOn,
        modifiedOn,
        createdBy
    ) VALUES($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING returning *`;

const findOneArticle = `select articleId, title, article, category, createdOn, 
                        createdBy, from articles where articleId=($1)`;

export default { createArticle, findOneArticle };
