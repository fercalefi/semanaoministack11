const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

   async delete(request, response){
    // pega o id passado na url como parametro 
    const {id} = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents').where('id', id).select('ong_id').first();

    if (incident.ong_id != ong_id ){
        return response.status(401).json({error: 'Operação não permitida.'});
    }

    await connection('incidents').where('id',id).delete();

    return response.status(204).send();


   },

   async index(request, response){

     const{ page = 1} = request.query;

     // pra retornar 1 resultado e como retorna um array, colocar o colchete pra retornar 1 resultado
     const [count] = await connection('incidents').count();
     response.header('X-Total-Count', count['count(*)']);

     //console.log(count);

     const incident = await connection('incidents')
     .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
     .limit(5)
     .offset((page -1) * 5)
     .select([
         'incidents.*', 
         'ongs.name', 
         'ongs.email', 
         'ongs.whatsapp', 
         'ongs.city', 
         'ongs.uf'
        ]);
     return response.json(incident);
   },

   async create(request, response){
     const {title, description, value} = request.body;
     const ong_id = request.headers.authorization;

     // faz o insert e retorna o id auto incrementado da tabela abaixo
     const[id] = await connection('incidents').insert({
       title,
       description,
       value,
       ong_id,
     })

     return response.json({id});

    }
}