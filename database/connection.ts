import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

const uri = "mongodb://localhost:27017";
const database = "node-example";

export const mongoClient = new MongoClient(uri);

let db: any;

try {
  db = mongoClient.db(database);

}catch(err) {
  console.log('Mongo DB Connection Error', err);
}

export default db;