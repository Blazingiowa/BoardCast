var Client = require('ftp');
var c = new Client();
c.connect({
    host:"192.168.11.32",
    port:21,//portが21の場合は省略可能
    user:"ftpkun",
    password:"ncc1"
})

c.on('ready', function() {
  var fs = require("fs");

c.get('NUMA.jpg', function(err, stream) {
  if (err) throw err;
  stream.once('close', function() { c.end(); });
  stream.pipe(fs.createWriteStream('test.txt'));
});
    
});

c.on('error',function(err){
    console.log(err);
})

c.on('greeting',function(message){
    console.log(message);
})