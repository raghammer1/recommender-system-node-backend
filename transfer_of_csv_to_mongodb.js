// // const fs = require('fs');
// // const csv = require('csv-parser');
// // const { MongoClient } = require('mongodb');

// // // MongoDB connection URI
// // const uri = 'mongodb://localhost:27017';
// // const dbName = 'movieDB'; // Replace with your database name
// // const collectionName = 'movies'; // Replace with your collection name

// // // Path to your CSV file
// // const csvFilePath = './tmdb_5000_movies.csv'; // Replace with the path to your CSV file

// // async function importCsvToMongo() {
// //   const client = new MongoClient(uri);

// //   try {
// //     await client.connect();
// //     console.log('Connected to MongoDB');
// //     const database = client.db(dbName);
// //     const collection = database.collection(collectionName);

// //     const results = [];

// //     fs.createReadStream(csvFilePath)
// //       .pipe(csv())
// //       .on('data', (data) => results.push(data))
// //       .on('end', async () => {
// //         await collection.insertMany(results);
// //         console.log(`${results.length} records inserted.`);
// //         await client.close();
// //       });
// //   } catch (err) {
// //     console.error('Error connecting to MongoDB', err);
// //     process.exit(1);
// //   }
// // }

// // importCsvToMongo();
// const fs = require('fs');
// const csv = require('csv-parser');
// const { MongoClient } = require('mongodb');

// // MongoDB Atlas connection URI
// const username = encodeURIComponent('syna-agarwal');
// const password = encodeURIComponent('Q8qJKwX5acZnjTUk');
// const clusterUrl =
//   'mongodb+srv://syna-agarwal:<Q8qJKwX5acZnjTUk>@cluster0.e3sde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB Atlas cluster URL
// const dbName = 'movieDB'; // Replace with your database name
// const collectionName = 'movies'; // Replace with your collection name

// const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

// // Path to your CSV file
// const csvFilePath = './tmdb_5000_movies.csv'; // Replace with the path to your CSV file

// async function importCsvToMongo() {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');
//     const database = client.db(dbName);
//     const collection = database.collection(collectionName);

//     const results = [];

//     fs.createReadStream(csvFilePath)
//       .pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', async () => {
//         await collection.insertMany(results);
//         console.log(`${results.length} records inserted.`);
//         await client.close();
//       });
//   } catch (err) {
//     console.error('Error connecting to MongoDB Atlas', err);
//     process.exit(1);
//   }
// }

// importCsvToMongo();
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const username = encodeURIComponent('syna-agarwal');
const password = encodeURIComponent('Q8qJKwX5acZnjTUk');
const clusterUrl = 'cluster0.e3sde.mongodb.net'; // MongoDB Atlas cluster URL without credentials
const dbName = 'movieDB'; // Replace with your database name
const collectionName = 'movies'; // Replace with your collection name

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

// Path to your CSV file
const csvFilePath = './tmdb_5000_movies.csv'; // Replace with the path to your CSV file

async function importCsvToMongo() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert data fields as needed, e.g., convert string numbers to actual numbers
        // data.someField = parseFloat(data.someField);
        results.push(data);
      })
      .on('end', async () => {
        if (results.length > 0) {
          await collection.insertMany(results);
          console.log(`${results.length} records inserted.`);
        } else {
          console.log('No data found in CSV file.');
        }
        await client.close();
      });
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
  }
}

importCsvToMongo();
