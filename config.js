exports.databaseConnectionString = require('./connections.js').mongodb;


exports.options = {
    //requests from not auth users will be redirected to redirectUri
    redirectUri: '/login'
}