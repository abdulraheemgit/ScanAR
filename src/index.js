
module.exports = {
  sanitize:
  {
    phoneNumber:function(phoneNumber){
      return isPhoneNumber(phoneNumber);
    },
    email:function(email){
      return isEmail(email);
    },
    numeric:function(number){
      return isNumeric(number);
    },
    alphanumeric:function(text){
      return isAlphaNumeric(tex);
    },
    alphabetic:function(text){
      return isAlphabetic(text);
    }
  },
  xssTest:function(target,paramNames){
    return xssCheck(target,paramNames);
  },
  escape:function(data) {
    return escapData(data);
  },
  xssDetect:function(input){
    return xssdetector(input);
  },
  sqlInjection:function(input){
    return sqlInjectionDetect(input);
  },
  post:'dssx',
  get:'dssx'

};
function sqlInjectionDetect(input){
  result = text.match(/(U\+)+/i);
  regex = /[\'\"\;\:\`\~\%\$\Q|\E\&\=]/g;
  if (true) {
    return ['Invalid', 'input contains harmful unicode encordings', 'posible attemt of a SQL Injection'];
  }else{
    if(!regex.test(input))
    return ['Valid','input has been purified from SQL Injection'];
    else {
      return ['Invalid', 'input contains harmful non alphanumeric characters', 'posible attemt of a SQL Injection'];
    }
  }
}
function xssdetector(inputs){
  detector = require('./xss.js');
  fs = require('fs');
  payload = fs.readFileSync(__dirname+'\\vectors.js').toString();
  response = {};
  if (typeof inputs === 'object') {
    if (Array.isArray(inputs)) {
      for(input in inputs){
        detect = detector.detect(input,payload);
        if (detect === 'found') {
          response = {input:detect};
        }
      }
    }else {
      return ["Input type must be array"];
    }
  }else {
    return ["Input type must be array"];
  }
  return response;
}

function escapData(data){
  var a,b;
  a = data.replace(/&/g, '&amp;');
  b = a.replace(/"/g, '&quot;');
  a = b.replace(/'/g, '&#39;');
  b = a.replace(/</g, '&lt;');
  a = b.replace(/>/g, '&gt;');
  b = a.replace(/!/g, '&#33;');
  a = b.replace(/\$/g, '&#36;');
  b = a.replace(/%/g, '&#37;');
  a = b.replace(/\(/g, '&#40;');
  b = a.replace(/\)/g, '&#41;');
  a = b.replace(/\*/g, '&#42');
  b = a.replace(/:/g, '&#58;');
  a = b.replace(/`/g, '&#96;');
  data = a.replace(/~/g, '&#126;');
  return data
}

function xssCheck(target,paramNames){
  console.log(target,paramNames);
}
function isAlphaNumeric(text){
  if(text === null){
    return ["cannot process null value"]
  }
  var regex = /^[a-zA-Z]*$/;
  if(lengthCheck(text,'text')){
    if(!regex.test(text)){
      return ["Valid"];
    }else {
      return ["Invalid", "Input does not match alphanumeric criteria","Posible attempt of an injection"];
    }
  }else {
    return ["Invalid", "Invalid length property","Posible attempt of a buffer overflow"];
  }
}
function isAlphabetic(text){
  if(text === null){
    return ["cannot process null value"]
  }
  var regex = /^[a-zA-Z]*$/;
  if(lengthCheck(text,'text')){
    if(regex.test(text)){
      return ["Valid"];
    }else {
      return ["Invalid", "Input does not match textOnly criteria","Posible attempt of an injection"];
    }
  }else {
    return ["Invalid", "Invalid length property","Posible attempt of a buffer overflow"];
  }
}

function isPhoneNumber(phoneNumber){
  if(phoneNumber === null){
    return ["cannot process null value"]
  }
  var regex = /^[+()\d]*[\d-]+[\d-()\s]*$/;
  if(lengthCheck(phoneNumber,'phone')){
    if(regex.test(phoneNumber)){
      return ["Valid"];
    }else {
      return ["Invalid", "Input does not match phone number criteria","Posible attempt of an injection"];
    }
  }else {
    return ["Invalid", "Invalid length property","Posible attempt of a buffer overflow"];
  }
}
function isEmail(email) {
  if(email === null){
    return ["cannot process null value"]
  }
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(lengthCheck(email,'email')){
    if(regex.test(email)){
      return ["Valid"];
    }else {
      return ["Invalid", "Input does not match email criteria","Posible attempt of an injection"];
    }
  }else {
    return ["Invalid", "Invalid length property","Posible attempt of a buffer overflow"];
  }
}
function isNumeric(number) {
  if(number === null){
    return ["cannot process null value"]
  }
  var regex = /^[\d]*$/;
  if(lengthCheck(number,'number')){
    if(regex.test(number)){
      return ["Valid"];
    }else {
      return ["Invalid", "Input does not match numeric criteria","Posible attempt of an injection"];
    }
  }else {
    return ["Invalid", "Invalid length property","Posible attempt of a buffer overflow"];
  }
}

function lengthCheck(data,type){
  var lengthRegex;
  switch (type) {
    case 'phone':
      lengthRegex = /^[\w\W]{8,16}$/g;
      break;
    case 'email':
      lengthRegex = /^[\w\W]{5,32}$/g;
      break;
    case 'number':
      lengthRegex = /^[\w\W]{0,255}$/g;
      break;
    case 'text':
      lengthRegex = /^[\w\W]{0,1024}$/g;
      break;
    default:
  }
  if(lengthRegex.test(data)) return true;
  else return false;

}
