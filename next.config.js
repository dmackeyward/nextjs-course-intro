// config.js

let MONGODB_URI;

if (process.env.NODE_ENV === 'production') {
  // For production, use the environment variable
  MONGODB_URI = process.env.MONGODB_URI;
} else {
  // For development, use the local .env variable
  const { MONGODB_URI: localMongoUri } = process.env;
  MONGODB_URI = localMongoUri;
}

module.exports = {
  MONGODB_URI,
};
