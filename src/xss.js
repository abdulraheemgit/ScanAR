const childProcess = require('child_process');


module.exports= {
    detect:function(input,payload){
      // return detect(input,payload);
      return createThreads(input,payload);
    }
  }
  function detect(files) {
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

  // function detect(input,payloads){
  function createThreads(input,payloads){

    // cluster.on('exit', function(worker, code, signal) {
    //   console.log('worker ' + worker.process.pid + ' died');
    // });
    //
    // cluster.on('listening', function(worker, address) {
    // });
    //
    // return ['success']

    console.log(__dirname+'  in detect');
    flag = 'not found';
    const numCPUs = require('os').cpus().length;
    payloadLines = payloads.split("\n");
    dataBundle = [input,payloadLines,numCPUs]
    worker={};

    for (var i = 0; i < numCPUs; i++) {
      worker [i] = childProcess.fork(__dirname+'\\worker.js');
      worker[i].on('message', (m) => {
        console.log('PARENT got message:', m);
      });
      dataBundle[3]= i;
      worker[i].send({data:dataBundle});
    }





    // worker.postMessage(dataBundle);



    // Object.keys(cluster.workers).forEach((id) => {
    //   cluster.workers[id].on('message', messageHandler);
    // });

    // console.log(__dirname+'  in detect');
    // flag = 'not found';
    // payloadLines = payloads.split("\n");
    // dataBundle = [input,payloadLines,'0']
    //
    // worker1 = new Worker(__dirname+'\\worker.js');
    // worker1.addEventListener('message', function(e){
    //   console.log(e.data);
    //   flag = 'found';
    //   return;
    // });
    // dataBundle[dataBundle.length-1] = '1';
    // worker1.postMessage(dataBundle);
    //
    // worker2 = new Worker(__dirname+'\\worker.js');
    // worker2.addEventListener('message', function(e){
    //   console.log(e.data);
    //   flag = 'found';
    //   return;
    // });
    // dataBundle[dataBundle.length-1] = '2';
    // worker2.postMessage(dataBundle);
    //
    // worker3 = new Worker(__dirname+'\\worker.js');
    // worker3.addEventListener('message', function(e){
    //   console.log(e.data);
    //   flag = 'found';
    //   return;
    // });
    // dataBundle[dataBundle.length-1] = '3';
    // worker3.postMessage(dataBundle);
    //
    // worker4 = new Worker(__dirname+'\\worker.js');
    // worker4.addEventListener('message', function(e){
    //   console.log(e.data);
    //   flag = 'found';
    //   return;
    // });
    // dataBundle[dataBundle.length-1] = '4';
    // worker4.postMessage(dataBundle);
    // return flag;
  }
