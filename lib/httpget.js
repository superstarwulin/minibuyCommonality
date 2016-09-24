'use strict';
var http = require('http');

exports.httpget = function(){

  var options = {
    host: 'www.google.com'
    //,
    //path: '/item1.htm?id='+id
  };

  http.get(options, function(res) {

    //console.log('product id :' + id+ '    product category:'+producttag + "    Got response: " + res.content);
    var body  = '';

    res.on("data", function(chunk) {
      //console.log("BODY: " + chunk);
      body += chunk;
    });

    res.on('end', function() {
      console.log(body);
    });


  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

}
