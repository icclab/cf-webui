var express = require('express');  
var request = require('request');
var request = require('request');

var app = express(); 

app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	var body = "";
  console.log('vamos a entrar');
  console.log(req.method);
  if (req.method==='POSTI'){
  	req.on('data', function(data) {
      body += data;
      console.log('estamos dentro');
    });
    req.on('end', function() {
      req.body=JSON.parse(body);
      req.url=req.body.url;
      console.log('y vamos a salir');
      console.log(body);
      console.log(req.url);
      console.log(req.hostname);
      req.pipe(request.post(req.body.url)).pipe(res);
      next();
      //console.log(req);
    });
  }else{
  	next();
  }
});

app.post('/api', function(req, res){
  var url = 'http://requestb.in/1f9yqul1';
  var url2 = 'https://uaa.run.pivotal.io/oauth/token';
  req.pipe(request.post(url)).pipe(res);
});

app.listen(process.env.PORT, function() {  
    console.log('App listening on port ' + process.env.PORT);
});