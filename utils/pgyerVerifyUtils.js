var regxUtils = require('./regxUtils.js');
var CONST = require('../const/pgyerInputConsts.js');

/*** tel feature ***/
function verifyPhone(content, countryCode) {
  if (countryCode == CONST.DATA.DEAFULT_COUNTRY_CODE) {
    return regxUtils.isTel(content);
  } else {
    return regxUtils.isGlobalNum(content);
  }
}
/*** get phone verification feature **/
function verifyPhoneValificaiton(content) {
  return regxUtils.isPhoneValification(content);
}
/*** phone or emial feature ***/
function verifyPhoneOrEmail(content) {
  return (regxUtils.isEmail(content) || regxUtils.isTel(content));
}
/*** password feature ***/
function verifyPassword(content) {
  return regxUtils.isPassword(content);
}

module.exports = {
  verifyPhone : verifyPhone,
  verifyPhoneValificaiton : verifyPhoneValificaiton,
  verifyPhoneOrEmail : verifyPhoneOrEmail,
  verifyPassword : verifyPassword
}
