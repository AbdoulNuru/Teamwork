const createComment = ` insert into comments (
        comment,
        commentedBy,
        articleCommented
    ) VALUES($1, $2, $3) ON CONFLICT DO NOTHING returning *`;

export default { createComment };
