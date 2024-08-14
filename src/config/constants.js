require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    AUTH_SERVICE_URL: 'http://localhost:1441/api/v1'
}