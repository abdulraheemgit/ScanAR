module.exports= {
    detect:function(input,payload){
      return detect(input,payload);
    }
  }

  function detect(input,payloads){
    console.log(__dirname+'  in detect');
    flag = 'not found';
    payloadLines = payloads.split("\n");
    dataBundle = [input,payloadLines,'0']

    worker1 = new Worker(__dirname+'\\worker.js');
    worker1.addEventListener('message', function(e){
      console.log(e.data);
      flag = 'found';
      return;
    });
    dataBundle[dataBundle.length-1] = '1';
    worker1.postMessage(dataBundle);

    worker2 = new Worker(__dirname+'\\worker.js');
    worker2.addEventListener('message', function(e){
      console.log(e.data);
      flag = 'found';
      return;
    });
    dataBundle[dataBundle.length-1] = '2';
    worker2.postMessage(dataBundle);

    worker3 = new Worker(__dirname+'\\worker.js');
    worker3.addEventListener('message', function(e){
      console.log(e.data);
      flag = 'found';
      return;
    });
    dataBundle[dataBundle.length-1] = '3';
    worker3.postMessage(dataBundle);

    worker4 = new Worker(__dirname+'\\worker.js');
    worker4.addEventListener('message', function(e){
      console.log(e.data);
      flag = 'found';
      return;
    });
    dataBundle[dataBundle.length-1] = '4';
    worker4.postMessage(dataBundle);
    return flag;
  }
