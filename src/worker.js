self.addEventListener('message', function(e) {
  function myFunction(files) {
    console.log(files);
    input = files[0];
    payload = files[1];
    startPoint = 0;
    endPoint = 0;
    flag = 'not found';
    if(files[2]==='1'){ startPoint = 0;   endPoint = 249;}
    if(files[2]==='2'){ startPoint = 250; endPoint = 499;}
    if(files[2]==='3'){ startPoint = 500; endPoint = 749;}
    if(files[2]==='4'){ startPoint = 750; endPoint = payload.length;}

    console.log("Thread "+files[2]);
    for(startPoint;startPoint<endPoint;startPoint++){
      if (payload[startPoint]) {
        if (payload[startPoint].includes(input)){
          flag = 'found'
        }else {
          continue;
        }
      }
    }
    return flag;
  }
  self.postMessage(myFunction(e.data))
});
