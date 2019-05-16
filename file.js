
var fs = require('fs');
var path = require('path');

function formatNumber(n){
  n = n.toString()
  return n[1] ? n : '0'+ n;
}
 

function formateTime(date,kind) {
     
    if (typeof (date)=='string'){
      date = new Date(date)
      if(!new Date('date').getDate()){ 
         date = new Date()
      }
    }
      
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
  
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if(kind == 1){
        return  [hour, minute, second].map(formatNumber).join(':');
    }else if(kind ==2){
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
    }else if(kind ==4){
        return [year, month, day].map(formatNumber).join('') + '-' + [hour, minute, second].map(formatNumber).join('');
    }else{
        return [year, month, day].map(formatNumber).join('-') ;
    }
    
  }
   function createFolder(to) { //文件写入 
    var sep = path.sep
    var folders = path.dirname(to).split(sep);
    var p = '';
    while (folders.length) { 
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
};

/*
html ='report/'+formateTime(Date(),4)+".html" 
createFolder(html);
localStream =  fs.writeFileSync(html,"");
function sleep(sleepTime) {
	for(var start = +new Date; +new Date - start <= sleepTime;) {};
}
 
*/

function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
  }
html ='report/'+formateTime(Date(),4)+".html" 
fs.exists("report/index.html", function(exists) {
	if(exists){
        copyFile("report/index.html",html)
    }else{
        createFolder("report/index.html")
        fs.writeFileSync("report/index.html","",{flag:"w"},function (err) {})
    }
});
function sleep(sleepTime) {
	for(var start = +new Date; +new Date - start <= sleepTime;) {};
}
sleep(300)
console.log("html:"+html) 


// testcafe chrome testSGL818.js  html