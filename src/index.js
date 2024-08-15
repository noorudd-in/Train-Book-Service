const express = require('express');
const {PORT} = require('./config/constants')
const v1Routes = require('./routes/index');

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Welcome to the server!')
})

app.use('/api', v1Routes)

app.listen(PORT, async () => {
    console.log(`Booking service is up and running on the port ${PORT}`)
})