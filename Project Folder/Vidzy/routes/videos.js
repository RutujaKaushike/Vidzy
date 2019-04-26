var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Vidzy');

router.get('/', function(req, res) {
    var collection = db.get('videos');
    var searchCriteria={};
    var search = req.query.search;
    var filter = req.query.filter;
    if(search && filter==='All') searchCriteria={'title':{'$regex':search,'$options':'i'}};
    else if(search) searchCriteria={'title':{'$regex':search,'$options':'i'},genre:filter};
    console.log(searchCriteria);
    collection.find(searchCriteria, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});

router.post('/', function(req, res){
    var collection = db.get('videos');

    collection.insert({
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;
		res.json(video);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
            _id: req.params.id
        },
        {
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description
        }, function(err, video){
            if (err) throw err;

            res.json(video);
        });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});


module.exports = router;

