const express = require('express');
const app = express();

const port = 6363;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('connected to mongod server');
});
mongoose.connect('mongodb://localhost/labyrinth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '/static')));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

require('./routes')(app);

app.get('/all', function (req, res) {
	res.render('all.html');
});

app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:' + port);
});
