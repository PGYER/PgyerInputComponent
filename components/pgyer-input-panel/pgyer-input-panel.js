// component/pgyer-input-panel.js
var verifyUtils = require('../../utils/pgyerVerifyUtils.js');
var CONST = require('../../const/pgyerInputConsts.js');

const TYPE_TEL = 'tel';
const TYPE_TEL_OR_EMAIL = 'telOrEmail';
const TYPE_PHONE_VALIFICATION = 'verificationCode';
const TYPE_PASSWORD = 'password';

Component({
  properties: {
    /*** common properties ***/
    value: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: ''
    },
    reminder: {
      type: String,
      value: ''
    },
    /*** tel properties ***/
    country_code: {
      type: String,
      value: '',
    },
    /*** get phone verification properties ***/
    validation_label: {
      type: String,
      value: '',
    },
    active: {
      type: String,
      value: 'false',
    },
    count_down: {
      type: String,
      value: CONST.DATA.DEAFULT_COUNT_DOWN_NUM
    },
    confirm_type: {
      type: String,
      value: 'done',
    }
  },
  data: {
    timer: {},
    types: {
      'tel': {
        'placeHolder': '请输入电话号码',
        'errorMessage': '输入的手机号码有误',
        'verifyFuc': verifyUtils.verifyPhone
      },
      'telOrEmail': {
        'placeHolder': '请输入电话号码或者邮箱',
        'errorMessage': '输入的邮箱或者手机号码有误',
        'verifyFuc': verifyUtils.verifyPhoneOrEmail
      },
      'verificationCode': {
        'placeHolder': '请输入验证码',
        'errorMessage': '输入的验证码有误',
        'verifyFuc': verifyUtils.verifyPhoneValificaiton
      },
      'password': {
        'placeHolder': '请输入密码',
        'errorMessage': '输入的密码有误',
        'verifyFuc': verifyUtils.verifyPassword
      }
    },
    fixedUI: false,
  },

  ready: function() {
    this.initDefaultType();
    this.initView();
  },

  methods: {
    /*** init ***/
    initView: function() {
      this.initDefaultType();
      this.initDefaultPlaceHolder();

      switch (this.data.type) {
        case TYPE_TEL:
          this.initDefaultCountryCode();
          break;
        case TYPE_PHONE_VALIFICATION:
          this.initDefalutVerificationCodeLabel();
          break;
      }
    },
    initDefaultType: function() {
      if (this.data.type === '') {
        this.setData({
          type: TYPE_TEL_OR_EMAIL
        });
      }
    },
    initDefaultPlaceHolder: function() {
      if (this.data.placeholder == '') {
        this.setData({
          placeholder: this.data.types[this.data.type].placeHolder
        })
      }
    },

    /*** init country Code ***/
    initDefaultCountryCode: function() {
      if (this.data.country_code == '') {
        this.setData({
          country_code: CONST.DATA.DEAFULT_COUNTRY_CODE
        });
      }
    },

    /***  init verification label ***/
    initDefalutVerificationCodeLabel: function() {
      if (this.data.validation_label == '') {
        this.setData({
          validation_label: CONST.DATA.DEFAULT_GET_PHONE_VALIDATION_LABEL_
        });
      }
    },

    /*** comonent inner eventHandle function ***/
    valueInput: function(e) {
      this.setValue(e.detail.value);
      this.valueInputListener(e);
    },
    clearValue: function() {
      this.setValue('');
      this.setErrorReminder('');
      this.listener('clear', '');
    },
    refreshErrorReminder: function() {
      let isHide = this.verifyValue();
      if (isHide) {
        this.setErrorReminder('');
      } else {
        if (this.data.reminder == '') {
          this.setErrorReminder(this.data.types[this.data.type].errorMessage);
        } else {
          this.setErrorReminder(this.data.reminder);
        }
      }
    },

    /*** common feature ***/
    verifyValue: function() {
      if (this.data.type == TYPE_TEL) {
        return this.data.types[this.data.type].verifyFuc(this.data.value, this.data.country_code);
      } else {
        return this.data.types[this.data.type].verifyFuc(this.data.value);
      }
    },
    listener: function(str, result) {
      var eventDetail = {};
      var eventOption = {};
      eventDetail.pgyerResult = result;
      this.triggerEvent(str, eventDetail, eventOption);
    },
    setValue: function(str) {
      this.setData({
        value: str
      });
    },
    setErrorReminder: function(str) {
      this.setData({
        reminder: str
      });
    },

    /*** get phone verification feature **/
    tapVerificationLabel: function() {
      if (this.data.active === 'false') {
        return;
      }
      this.startCountDown();
      this.tapVerificationLabelListener();
    },
    startCountDown: function() {
      let that = this;
      var countDownNum = parseInt(this.data.count_down);
      this.setData({
        active: 'false',
        validation_label: countDownNum + "s"
      });
      this.data.timer = setInterval(function() {
        countDownNum--;
        that.setData({
          validation_label: countDownNum + "s"
        });
        if (countDownNum == 0) {
          that.stopCuntDown();
        }
      }, 1000);
    },
    stopCuntDown: function() {
      clearInterval(this.data.timer);
      this.setData({
        validation_label: CONST.DATA.DEFAULT_REGET_PHONE_VALIDATION_LABEL,
        active: 'true',
      });
    },

    /*** exports eventHandle ***/
    confirm: function(e) {
      this.listener('confirm', e);
    },
    valueInputListener: function(e) {
      let isLegal = this.verifyValue();
      let data = {};
      data.value = e.detail.value;
      data.isLegal = isLegal;
      this.listener("input_verify", data);
    },
    tapCountryCodeListener: function() {
      this.listener('country_code', '');
    },
    tapVerificationLabelListener: function() {
      this.listener('verification_label', '');
    },
    /*** this is fixed wechat mini program placeholder on ios bug must refresh css **/
    fixedUI: function() {
      this.setData({
        fixedUI: true
      })
    }
  }
});
