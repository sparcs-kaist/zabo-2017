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


    app.get('/zabos/zabo_id', function(req, res) {
    	zabo.find(function(err, zabos) {
    		if(err) {
    			console.log(err);
    			res.status(500).end('Database error');
    		}
    		res.json(zabos);
    		res.end('success!');
    	});
    });

    /************/
    /* API part */
    /************/

}