const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

   async index(request, response){
     const ongs = await connection('ongs').select('*');
     return response.json(ongs);
   },

   async create(request, response){
     //    const data = request.body;
     const {name, email, whatsapp, city, uf} = request.body;
     // console.log(data);
     const id = crypto.randomBytes(4).toString('Hex');

     await connection('ongs').insert({
       id, 
       name, 
       email, 
       whatsapp, 
       city, 
       uf,
     })

     return response.json({id});

    }
}