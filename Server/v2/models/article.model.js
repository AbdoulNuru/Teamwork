const article = req => {
  const art = {
    title: req.body.title,
    article: req.body.article
  };
  return art;
};

export default article;
