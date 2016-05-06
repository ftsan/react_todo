var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/todo', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/todo', function(req, res) {
  console.log(req.body);
  fs.readFile('comments.json', function(err, data) {
    const body = req.body;
    var comments = JSON.parse(data);
    for (key in body) {
	console.log(body[key]);
        if (body[key] === 'false') {
	    body[key] = false;
	}
        if (body[key] === 'true') {
	    body[key] = true;
	}
    }
    comments.push(body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.put('/api/todo', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    const body = req.body;
    var comments = JSON.parse(data);
    for (key in body) {
        if (body[key] === 'false') {
	    body[key] = false;
	}
        if (body[key] === 'true') {
	    body[key] = true;
	}
    }
    const targetKey = body['taskName'];
    var i;
    for (i = 0; i < comments.length; i++) {
	var task = comments[i];
        if (task['taskName'] === targetKey) {
	    task['isFinished'] = body.isFinished;
	    comments[i] = task;
	    console.log(comments);
	    break;
	}
    }
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
