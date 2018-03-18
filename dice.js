var int_highright = function(a,b){return a-b;}

var mdn = function(m,n){
var res = new Array(); 
for(var i = 0; i<m; i++)
    {res.push(Math.floor(Math.random()*n)+1);}
res.sort(int_highright); 
return res;}

mdns = function(ll){
var res = new Array();
for(var lx in ll){
   var l = ll[lx];
   //use hack: l.slice(0,undefined) == l !
   if((l[2]!=undefined)||(l[2]==0))
    {
        var s = -l[2];
        if(s>0){        
        res.push(mdn(l[0],l[1]).slice(0,s));
        }else{
        res.push(mdn(l[0],l[1]).slice(l[0]+s));
        }
    }else{
        res.push(mdn(l[0],l[1]));
    }
}
return res;
}

module.exports.mdns = mdns;
