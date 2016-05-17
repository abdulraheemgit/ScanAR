var fs = require('fs');

if (!fs.existsSync('../../../scripts')){
    fs.mkdirSync('../../../scripts');
}
fs.closeSync(fs.openSync("../../../scripts/browser.js", 'w'));


var j = {};
fs.readFile('../../../package.json', 'utf8', function(err, data){
  j = JSON.parse(data);
  j.scripts.prestart = 'browserify ./node_modules/scan-a-r/src/index.js -o ./script/browser.js';
  console.log(j);
  fs.writeFile('../../../package.json',JSON.stringify(j, null, 4), function(err){
    if(err){
      console.log('err');
    }
    console.log('all ok');
  })
});
