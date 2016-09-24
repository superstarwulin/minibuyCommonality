
var fs = require('fs');

exports.minibuylog = function(a){

    fs.appendFile("./minibuy.log", a + '\n', function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
