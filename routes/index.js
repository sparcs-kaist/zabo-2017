const userSchema = require('./../models/user.js');
const zaboSchema = require('./../models/zabo.js');
const logSchema = require('./../models/log.js');

module.exports = (app) => {
    /************/
    /* Web part */
    /************/
    app.get('/main', (req, res) => {
       res.render('main.html');
    });


    /************/
    /* API part */
    /************/
}