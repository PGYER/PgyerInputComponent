//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tel: "",
    email: "",
    verificationCode: "",
    password: ""
  },
  isEmailOrTel: function(e) {
    console.log("this is emial or tel", e.detail.pgyerResult);
  },
  isPhone: function(e) {
    console.log("this is phone", e.detail.pgyerResult);
  },
  isVerificationCode: function(e) {
    console.log("this is verification code", e.detail.pgyerResult);
  },
  isPassword: function(e) {
    console.log("this is password", e.detail.pgyerResult);
  },
  confirm: function(e) {
    console.log("click confirm button ", e);
  },
  pickCountryCode: function(e) {
    console.log("click country code", e);
  },
  clickVerificationLabel: function(e) {
    console.log("click verification label", e);
  },
  cancelCountDownAfterClick: function() {
    let component = this.selectComponent('#component-id');
    setTimeout(function(){
      component.stopCuntDown();
    }, 5000);
  }
})
