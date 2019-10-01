import Hapi from '@hapi/joi';

const articleValidation = (article)=>{
    let Schema = Hapi.object({
        id: Hapi.number().required(),
        title: Hapi.string().required(),
        article: Hapi.string().required(),
        createdOn: Hapi.date().required(),
        createdBy: Hapi.number().required()
    });
    return Schema.validate(article);
};

export default articleValidation;

