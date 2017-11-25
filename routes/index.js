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
	//create new
	app.post ('/api/users', function(req, res) {
		userSchema.find ({ id: req.body.id }, function(err, users) {
			if (users.length>0) return res.json({error:'Duplicated ID, choose another one'});

			var user = new userSchema();
			user.id = req.body.id;
			user.orgs = req.body.orgs;
			user.favoriteZabos = req.body.favoriteZabos;
			user.favoriteOrgs = req.body.favoriteOrgs;

			user.save(function(err) {
				if (err) {
					console.log(err);
					return res.status(500).json({error:'Database error'});
				}
				res.json({message: 'save success'});
			});
		});
		res.end();
	});

	// get
	app.get('/api/users/:id', function(req, res) {
		userSchema.findOne( {id: req.params.id}, function(err, user) {
			if(err) return res.status(500).send({error: 'Database error'});
			if (!user) return res.status(404).json({error: 'user not found'});
			res.json(user);
		});
		res.end();
	});

	// update
	app.put('/api/users/:id', function(req, res) {
		userSchema.update({ id: req.params.id }, function(err, result) {
			if (err) {
				console.log(err);
				return res.status(500).end('database error');
			}
			if (!result.n) return res.status(404).json({error: 'user not found'});
			res.json({message: 'user updated'});
		});
		res.end();
	});

	// delete
	app.delete('/api/users/:id', function(req, res) {
		userSchema.remove({ id: req.params.id }, function(err, result){
			if (err) {
				console.log(err);
				return res.status(500).json({error:'database error'});
			}
			res.json({message: 'delete success!'});
		});
		res.end();
	});
}