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
  inputEmailOrTel: function(e) {
    console.log("this is emial or tel", e.detail.pgyerResult);
    this.setData({
      email : e.detail.pgyerResult.value
    })
  },
  inputPhone: function(e) {
    console.log("this is phone", e.detail.pgyerResult);
    this.setData({
      tel : e.detail.pgyerResult.value
    })
  },
  inputVerificationCode: function(e) {
    console.log("this is verification code", e.detail.pgyerResult);
    this.setData({
      verificationCode : e.detail.pgyerResult.value
    })
  },
  inputPassword: function(e) {
    console.log("this is password", e.detail.pgyerResult);
    this.setData({
      password : e.detail.pgyerResult.value
    })
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
