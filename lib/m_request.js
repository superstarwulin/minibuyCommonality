var request = require('request');

exports.requestm=function(){

    var id = 527562703503;

    //var url = 'https://detail.tmall.com/item.htm?id='+id;
    var url = 'http://www.baidu.com';

    request(url , function (error, response, body) {
        if(error)
        {
            console.log(error);

        }


        if(!error)
        {
            console.log(response.statusCode);
            console.log(body);

        }

        if (!error && response.statusCode == 200) {


            if(/errorPage/.test(body)){

                console.log('wrong:   category: ' + '   ' + 'id == ' + id);
                return;
            }

            if(/J_DetailMeta/.test(body)){

                console.log('right:   category: ' + '   ' + 'id == ' + id);
            }
        }
        if(error){
            //console.log(error)
        }
    })

}



