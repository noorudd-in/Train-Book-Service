require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
    SEARCH_SERVICE_URL: process.env.SEARCH_SERVICE_URL,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
}