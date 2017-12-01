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
	app.post('/api/users', function(req, res) {
		userSchema.find({ id: req.body.id }, function(err, users) {
			if (users.length > 0) return res.status(400);

			var user = new userSchema();
			user.id = req.body.id;
			user.orgs = req.body.orgs;
			user.favoriteZabos = req.body.favoriteZabos;
			user.favoriteOrgs = req.body.favoriteOrgs;

			user.save(function(err) {
				if (err) {
					console.log(err);
					return res.status(500);
				}
				res.json({ success: true });
			});
		});
	});

	// get
    app.get('/api/test', (req, res) => {
       res.render('api_test.html');
    });

	app.get('/api/users/:id', function(req, res) {
		userSchema.findOne({ id: req.params.id }, function(err, user) {
			if(err) return res.status(500);
			if (!user) return res.status(404);
			res.json(user);
		});
	});

	// update
	app.put('/api/users/:id', function(req, res) {
		userSchema.update({ id: req.params.id }, function(err, result) {
			if (err) {
				console.log(err);
				return res.status(500);
			}
			if (!result.n) return res.status(404);
			res.json({ success: true });
		});
	});

	// delete
	app.delete('/api/users/:id', function(req, res) {
		userSchema.remove({ id: req.params.id }, function(err) {
			if (err) {
				console.log(err);
				return res.status(500);
			}
			res.json({ success: true });
		});
	});

    app.get('/api/zabos/mains', function(req, res) {
        zaboSchema.find(function(err, zabos) {
            if(err) return res.status(500).json({error: err});
            for(zabo in zabos){
                if(zabo.isMain) res.json(zabo);
            }
        })
    });

    app.delete('/api/zabos/mains', function(req, res) {
        /* TODO: admin ONLY */
        zaboSchema.find(function(err, zabos) {
            if(err) return res.status(500).json({error: err});
            for(zabo in zabos){
                if(zabo.isMain) zabo.isMain = false;
            }

            zaboSchema.save(function(err) {
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'zabo main updated'});
            });
        });
    });

    app.post('/api/zabos/mains/:zabo_id', function(req, res) {
        zaboSchema.findOne({id: req.params.zabo_id}, function(err, zabo) {
            if(err) return res.status(500);
            if(!zabo) return res.status(404);
            zabo.isMain = true;
            zaboSchema.save(function(err) {
                if(err) res.status(500);
                res.json({ success: true });
            });
        });
    });

    app.delete('/api/zabos/mains/:zabo_id', function(req, res) {
        zaboSchema.findOne({id: req.params.zabo_id}, function(err, zabo) {
            if(err) return res.status(500);
            if(!zabo) return res.status(404);
            zabo.isMain = false;
            zaboSchema.save(function(err) {
                if(err) res.status(500);
                res.json({ success: true });
            });
        });
    });

    app.get('/api/zabos/:zabo_id', function(req,res) {
        zaboSchema.findOne({id: req.params.zabo_id}, function(err, zabo) {
            if(err) return res.status(500).send({error: 'Database error'});
            if(!zabo) return res.status(404).json({error: 'zabo not found'});
            res.json(zabo);
        });
    });

    app.put('/api/zabos/:zabo_id', function(req, res) {
        zaboSchema.update({ id: req.params.zabo_id }, { $set: req.body }, function(err, output) {
            if(err) res.status(500);
            if(!output.n) return res.status(404);
            res.json({ success: true });
        });
    });

    app.delete('/api/zabos/:zabo_id', function(req, res) {
        zaboSchema.remove({ id: req.params.zabo_id }, function(err) {
            if(err) return res.status(500).json({ error: "Database error" });
            res.status(204);
        })
    });

    app.get('/api/zabos', function(req, res) {
        zaboSchema.find(function(err, zabos) {
            if (err) return res.status(500).json({error: "Database error" });
            res.json({});
        })
    });

    app.post('/api/zabos', function(req, res) {
        var zabo = new zaboSchema();
        zabo.id = req.body.id;
        zabo.img = req.body.img;
        zabo.eventName = req.body.eventName;
        zabo.writer = req.body.writer;
        zabo.category = req.body.category;
        zabo.applyStart = req.body.applyStart;
        zabo.applyEnd = req.body.applyEnd;
        zabo.eventStart = req.body.eventStart;
        zabo.eventEnd = req.body.eventEnd;
        zabo.description = req.body.description;
        zabo.report = req.body.report;
        zabo.toAra = req.body.toAra;
        zabo.isMain = req.body.isMain;

        zabo.save(function(err) {
            if (err){
                console.log(err);
                return res.status(500);
            }
            res.json({});
        })

    });

    app.delete('/api/zabos', function(req, res) {
        zaboSchema.remove({}, function(err) {
            if (err) return res.status(500).json({ error: "Database error" });
            res.status(200);
        })
    });

}