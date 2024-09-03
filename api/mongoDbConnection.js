// const mongoose = require('mongoose');

// function connectToDatabase() {
//   return mongoose.connect('mongodb://localhost:27017/movieDB');
// }

// module.exports = connectToDatabase;
const mongoose = require('mongoose');

function connectToDatabase() {
  const username = encodeURIComponent('syna-agarwal');
  const password = encodeURIComponent('Q8qJKwX5acZnjTUk');
  const clusterUrl = 'cluster0.e3sde.mongodb.net'; // MongoDB Atlas cluster URL without credentials
  const dbName = 'movieDB'; // Replace with your database name

  const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectToDatabase;
