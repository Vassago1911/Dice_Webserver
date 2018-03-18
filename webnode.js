//192.168.178.34:7000/?d1=[1,20]&d2=[3,10,2]&d3=[1,20,5]
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var int_highright = function(a,b){return b-a;}

var mdn = function(nr,dice,keep){
    var res = new Array(); 
    for(var i = 0; i<nr; i++)
    {
        res.push(Math.floor(Math.random()*dice)+1);
    }
    res.sort(int_highright); 
    if(keep<nr){res = res.slice(0,keep);}
    return res;
}

var assocarr_tostr = function(arr){
    var s = '{\n';
    
    for(var ix in arr){
       s = s +'"'+ ix + '":['+arr[ix]+'],\n';
    }

    s = s.substr(0,s.length-2); //delete ',\n'

    s = s + '\n}\n';
    return s;
}

var fn = function(request,response){
    try{
        query = url.parse(request.url).query;
        queryAccess = querystring.parse(query);
        response.writeHead(200, {'Content-Type':'text/plain'});    

        res = new Array();

        for(var i in queryAccess)
        {    
            ll = JSON.parse(queryAccess[i]);
            if((ll.length>=2)&&(ll.length<=3))
            {
                dstr = ll[0] + 'd' + ll[1];
                if(ll[2]!=undefined){dstr = dstr + 'keep'+ll[2];}
                res[dstr]=mdn(1*ll[0],1*ll[1],1*ll[2]);
            }
        }

        console.log(res);
        response.write(assocarr_tostr(res));
        response.end();
    }catch(err){
        response.writeHead(200, {'Content-Type':'text/plain'});    
        response.write('{"try something else":""}');
        response.end();    
    }
}

http.createServer(fn).listen(7000);
