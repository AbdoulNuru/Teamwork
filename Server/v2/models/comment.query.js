const createComment = ` insert into comments (
        comment,
        commentedBy,
        articleCommented
    ) VALUES($1, $2, $3) ON CONFLICT DO NOTHING returning *`;
const fetchComment = `select * from comments where articlecommented=($1) `;

export default { createComment, fetchComment };
