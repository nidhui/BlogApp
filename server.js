const express = require('express');
const bodyParser = require('body-parser');
const { router: authRouter } = require('./auth');
const { router: blogRouter } = require('./blog');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/api', blogRouter);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
