process.on('message', function(e) {
  // console.log(e.data + '    this is I');
  function myFunction(files) {
    console.log(files[0]);
    input = files[0];
    payload = files[1];
    startPoint = 0;
    endPoint = 0;
    flag = 'not found';
    perProcessPayload =  Math.floor(payload.length/files[2]);
    console.log(perProcessPayload + '  per pay');
    console.log(payload.length +'  length');
    for(var i=0;i < files[2];i++){
      if(i === files[3]){
        // console.log('file no '+ files[3]);
        startPoint = perProcessPayload*i;
        endPoint = startPoint + perProcessPayload
      }
      if(files[3] === files[2]-1){
        startPoint = perProcessPayload*i;
        endPoint = payload.length-1;
      }
    }

    console.log('startPoint '+startPoint);
    console.log("endPoint "+endPoint);
    // if(files[2]==='1'){ startPoint = 0;   endPoint = 249;}
    // if(files[2]==='2'){ startPoint = 250; endPoint = 499;}
    // if(files[2]==='3'){ startPoint = 500; endPoint = 749;}
    // if(files[2]==='4'){ startPoint = 750; endPoint = payload.length;}

    // console.log("Thread "+files[2]);
    for(startPoint;startPoint<=endPoint;startPoint++){
      if (payload[startPoint]) {
        if (payload[startPoint].includes(input)){
          // console.log("got it ");
          flag = 'found'
        }else {
          continue;
        }
      }
    }
    return flag;
  }
  process.send(myFunction(e.data))
});
