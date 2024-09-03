const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: Number,
  homepage: String,
  original_title: String,
  popularity: String,
});

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   watchlist: [movieSchema],
// });

const genreSchema = mongoose.Schema({ id: Number, name: String });

const Movie = mongoose.model('Movie', movieSchema);

// const User = mongoose.model('User', userSchema);

module.exports = {
  Movie,
  // User,
  // MovieFullData,
};
