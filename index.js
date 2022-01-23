const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const userRoute = require('./route/user.route');
const tagRoute = require('./route/tag.route');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(helmet());

// Start Routes 
// API route for user start with - /api/user prefix 
app.use('/api/user', userRoute);

// API route for tag start with - /api/tag prefix
app.use('/api/tag', tagRoute);
// End Routes

// Inital Route
app.get('/', async (req, res) => {
    return res.status(200).send('SUCCESS');
});

app.listen(config.port, config.host, function () {
    console.log("App listening at http://%s:%s",config.host,config.port);
})

module.exports = app;