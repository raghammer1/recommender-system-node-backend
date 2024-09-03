// const express = require('express');
// const cors = require('cors');
// const app = express();
// // Ensure these modules are used if included
// const { Movie } = require('./mongooseSchemas');
// // const { getMovies, getSearchMovies, getSingleMovie } = require('./tmdbAPI');
// const connection = require('./mongoDbConnection');
// // const encrypt = require('./encryption');
// const axios = require('axios');

// const port = process.env.PORT || 3001;

// app.use(cors());

// const allowedOrigins = ['http://localhost:3000']; // Add other origins if needed

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin, like mobile apps or curl requests
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           'The CORS policy for this site does not allow access from the specified origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connection()
//   .then(() => {
//     // app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
//     // });
//   })
//   .catch((err) => {
//     console.error('Database connection failed', err);
//     process.exit(1); // Exit the process with an error code (1) if the database connection fails
//   });

// app.get('/', async (req, res) => {
//   try {
//     res.json('CONNECTED');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching movies');
//   }
// });

// app.get('/movies', async (req, res) => {
//   try {
//     const movies = await Movie.find({}); // Using Mongoose to fetch all documents from the 'movies' collection
//     res.json(movies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching movies');
//   }
// });

// app.get('/recommender', async (req, res) => {
//   const title = req.query.title;
//   try {
//     axios
//       .get(
//         `https://recommender-system-python-only.onrender.com/recommend?title=${encodeURIComponent(
//           title
//         )}`
//       )
//       .then((response) => {
//         console.log(response.data);
//         res.json(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// });
const express = require('express');
const cors = require('cors');
const app = express();
const { Movie } = require('./mongooseSchemas');
const connection = require('./mongoDbConnection');
const axios = require('axios');

const port = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://your-vercel-domain.vercel.app', // Replace with your actual Vercel domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection and server start
connection()
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
      });
    }
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1); // Exit the process with an error code (1) if the database connection fails
  });

// Routes
app.get('/', async (req, res) => {
  try {
    res.json('CONNECTED');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movies');
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({}); // Fetch all documents from the 'movies' collection
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movies');
  }
});

app.get('/recommender', async (req, res) => {
  const title = req.query.title;
  try {
    const response = await axios.get(
      // https://recommender-system-python-only.onrender.com
      `http://127.0.0.1:5001/recommend?title=${encodeURIComponent(title)}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Flask API:', error);
    res.status(500).send('Failed to get recommendations');
  }
});

// Export the app for Vercel's serverless function
module.exports = app;
