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
    app.get('/api/zabos/mains', function(req, res){
        zaboSchema.find(function(err, zabos){
            if(err) return res.status(500).json({error: err});
            for(zabo in zabos){
                if(zabo.isMain) res.json(zabo);
            }
        })
        res.end();
    });

    app.delete('/api/zabos/mains', function(req, res){
        zaboSchema.find(function(err, zabos){
            if(err) return res.status(500).json({error: err});
            for(zabo in zabos){
                if(zabo.isMain) zabo.isMain = false;
            }

            zaboSchema.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'zabo main updated'});
            });
        })
        res.end();
    });

    app.post('/api/zabos/mains', function(req, res){
        zaboSchema.findOne({id: req.body.zabo_id}, function(err, zabo){
            if(err) return res.status(500).send({error: 'Database error'});
            if(!zabo) return res.status(404).json({error: 'zabo not found'});
            zabo.isMain = true;

            zaboSchema.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'zabo main updated'});
            });
        })
        res.end();
    });

    app.delete('/api/zabos/mains/:zabo_id', function(req, res){
        zaboSchema.findOne({id: req.params.zabo_id}, function(err, zabo){
            if(err) return res.status(500).send({error: 'Database error'});
            if(!zabo) return res.status(404).json({error: 'zabo not found'});
            zabo.isMain = false;

            zaboSchema.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'zabo main updated'});
            });
        })
        res.end();
    });

    app.get('/api/zabos/:zabo_id', function(req,res){
        zaboSchema.findOne({id: req.params.zabo_id}, function(err, zabo){
            if(err) return res.status(500).send({error: 'Database error'});
            if(!zabo) return res.status(404).json({error: 'zabo not found'});
            res.json(zabo);
        });
        res.end();
    });

    app.put('/api/zabos/:zabo_id', function(req, res){
        zaboSchema.update({ id: req.params.zabo_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'Database error' });
            if(!output.n) return res.status(404).json({ error: 'zabo not found' });
            res.json( { message: 'zabo updated' } );
        })
        res.end();
    });

    app.delete('/api/zabos/:zabo_id', function(req, res){
        zaboSchema.remove({ id: req.params.zabo_id }, function(err, output){
            if(err) return res.status(500).json({ error: "Database error" });

            res.status(204).end();
        })
    });

}