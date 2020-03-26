//importando as funcionalidades do express. importando omodulo expresss para a variavel express
const express = require('express');
const cors = require('cors');

// importa a variavel routes exportada do arquivo routes.js. Passa o ./ pra identificar que é um arquivo. ./ volta uma pasta
const routes = require('./routes')

// armazenar a aplicação na variavel 
const app = express();

app.use(cors());

/*Converter o json para objeto*/ 
app.use(express.json());

app.use(routes);
/*
Query params: Parametros nomeados enviados na rota após ? (filtros paginação)
Route params: Parametros utilizados par aidentificar reursos
Request Body: Corpo da requisiçao, utilizado para criar ou alterar recursos
*/
/*
nosql: Mongodb, CouchDb, etc
sql: Mysql, sqllite, postgresql, oracle, sql server: sqlite
Driver: select * from users
Query builder: table('users').select('*').where(); -> Knex.js
*/



//ouvir a porta 3333
app.listen(3333);

