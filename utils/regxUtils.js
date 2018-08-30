function isTel(string){
  return /^1(3|4|5|7|8)\d{9}$/.test(string);
}

function isEmail(string){
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(string);
}

function isPhoneValification(string){
  return /^\d{6}$/.test(string);
}
function isPassword(string){
  return /.{6,}/.test(string);
}
function isGlobalNum(string){
  return /.{5,}/.test(string);
}
module.exports = {
  isTel : isTel,
  isEmail : isEmail,
  isPassword : isPassword,
  isGlobalNum : isGlobalNum,
  isPhoneValification : isPhoneValification
}
