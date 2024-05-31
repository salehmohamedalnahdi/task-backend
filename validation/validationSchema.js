const Joi = require('joi');


const createSchema=(requestBody)=>{
    const schema = Joi.object({
        title: Joi.string().required(),
      });
      return schema.validate(requestBody)
}
const updateSchema=(requestBody)=>{
  const schema = Joi.object({
      title: Joi.string().required(),
      isDone: Joi.boolean().required(),
    });
    return schema.validate(requestBody)
}
module.exports={createSchema,updateSchema}
