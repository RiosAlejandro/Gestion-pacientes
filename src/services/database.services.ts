import * as mongoDB from "mongodb";

export const collections: { pacientes?: mongoDB.Collection } = {};

export async function connectToDatabase () {

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  await db.command({
    "collMod": process.env.PACIENTES_COLLECTION_NAME,
    "validator": {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "dateOfBirth", "ssn", "gender", "occupation"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: {
            bsonType: "string",
            description: "'name' is required and is a string"
          },
          dateOfBirth: {
            bsonType: "string",
            description: "'dateOfBirth' is required and is a string"
          },
          ssn: {
            bsonType: "string",
            description: "'ssn' is required and is a string"
          },
          gender: {
            bsonType: "string",
            description: "'gender' is required and is a string"
          },
          occupation: {
            bsonType: "string",
            description: "'occupation' is required and is a string"
          },
        }
      }
    }
  });
 
  const pacientesCollection: mongoDB.Collection = db.collection(process.env.PACIENTES_COLLECTION_NAME as string);

  collections.pacientes = pacientesCollection;
     
       console.log(`Successfully connected to database: ${db.databaseName} and collection: ${pacientesCollection.collectionName}`);
}
