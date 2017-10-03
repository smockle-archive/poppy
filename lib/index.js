require = require('@std/esm')(module)
module.exports = {
  Friends: require('./friends.mjs').default,
  Username: require('./username.mjs').default
}
