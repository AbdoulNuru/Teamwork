import Hapi from '@hapi/joi';

const articlevalidated = article => {
  const Schema = Hapi.object({
    title: Hapi.string().required(),
    article: Hapi.string()
      .min(120)
      .required()
  });
  return Schema.validate(article);
};

export default articlevalidated;
