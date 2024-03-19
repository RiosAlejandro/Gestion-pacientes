import * as mongoDB from "mongodb";

export const collections: { pacientes?: mongoDB.Collection } = {};

export async function connectToDatabase () {

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
 
  const pacientesCollection: mongoDB.Collection = db.collection(process.env.PACIENTES_COLLECTION_NAME as string);

collections.pacientes = pacientesCollection;
     
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${pacientesCollection.collectionName}`);
}
