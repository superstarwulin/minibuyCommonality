var fs = require('fs');
var http = require('http');
var net = require('net');
var request = require('request');

var requestpost = require('./lib/httppost');
var httpget = require('./lib/httpget');

var _minibuylog = require('./lib/minibuylog');


var async = require('async');

var concurrencyCount = 0;

var fetchUrl = function (url, callback) {
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
};
var countright = 0 ,countwrong = 0;

exports.runAllProductTest =function(){

    // get all tmall product category and example id
    var obj;

    fs.readFile('lib/product.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        checkout(obj);
    });

    var headerstr = "minibuy 全天猫商品覆盖率 \n";
    headerstr += "商品是否有效|类目|id| rate  \n";
    headerstr += "------------ | ------------- | ------------ | ------------  \n";

    // clean log
    fs.writeFile("minibuy.log", headerstr, function(err) {
        if(err) {
            return console.log(err);
        }

    });

    // run
     function checkout(productobj) {
         //
         //var urls = [];
         //
         //for(var i = 0 ; i < productobj.length; i++)
         //{
         //    t = productobj[i];
         //
         //    // run one
         //    if(t.item_id){
         //        urls.push(t.item_id);
         //        //nodecurlOneProduct(t.item_id, t.item_tagName);
         //
         //    }
         //
         //}
         //
         //async.mapLimit(urls, 5, function (url, callback) {
         //    fetchUrl('https://detail.tmall.com/item.htm?id='+url, callback);
         //}, function (err, result) {
         //    console.log('final:');
         //    console.log(result);
         //});



        var t ;

        for(var i = 0 ; i < productobj.length; i++)
        {
            t = productobj[i];

            // run one
            if(t.item_id){
                //nodecurlOneProduct(t.item_id, t.item_tagName);

                nodecurlOneProduct(t.item_id, t.item_tagName );
            }
            if(i == productobj.length-1){
                    //_minibuylog.minibuylog('minibuy 有效 类目数：'+countright);
                    //_minibuylog.minibuylog('minibuy 失效 类目数：'+ countwrong);
                    ////_minibuylog.minibuylog('全天猫商品按类目分有效率：'+ (countright/ (countright+countwrong)));

            }
        }

         var radio = countright/(countright+countwrong);

    };

    function nodecurlOneProduct (id , producttag,last){

        // https://detail.m.tmall.com/templates/pages/miniBuy?id=525533221799

        request('https://detail.m.tmall.com/templates/pages/miniBuy?id='+id, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //
                //if(/errorPage/.test(body)){
                //    countwrong++;
                //
                //    console.log('wrong:   category: '+ producttag + '   ' + 'id == ' + id);
                //    return;
                //}
                //


                if(/defaultModel/.test(body)){
                    countright++;

                    _minibuylog.minibuylog('有效:|   '+ producttag + '|   ' + '' + id +'|    ct'+countright);
                }else{
                    countwrong++;

                    _minibuylog.minibuylog('失效:|    '+ producttag + '|   ' + '' + id + '|   cw'+ countwrong);
                    return;
                }

            }
            if(error){
                //console.log(error)
            }
        })

    }

    // output


};
