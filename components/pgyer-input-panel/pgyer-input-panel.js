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
        /*** tel properties ***/
        countrycode: {
            type: String,
            value: '',
        },
        /*** get phone verification properties ***/
        validationlabel: {
            type: String,
            value: '',
        },
        active: {
            type: Boolean,
            value: '',

        },
        countdown: {
            type: String,
            value: CONST.DATA.DEAFULT_COUNT_DOWN_NUM
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        errorReminder: '',
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
        }
    },

    ready: function () {
        this.initView();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /*** common feature ***/
        initView: function () {
            this.initDefaultType();
            this.initDefaultPlaceHolder();

            switch (this.data.type) {
                case TYPE_TEL:
                    this.initDefaultCountryCode();
                    break;
                case TYPE_PHONE_VALIFICATION:
                    this.initDefalutPhoneVerificationLabel();
                    break;
            }
        },
        contentInput: function (e) {
            this.setContent(e.detail.value);
            let isLegal = this.verifyContent();
            this.listener("verifyevent", isLegal);
        },
        setContent: function (str) {
            this.setData({
                value: str
            });
        },
        clearContent: function () {
            this.setContent('');
        },
        showErrorContent: function () {
            let isHide = this.verifyContent();
            this.refreshErrorReminder(isHide);
        },
        verifyContent: function () {
            if (this.data.type == TYPE_TEL) {
                return this.data.types[this.data.type].verifyFuc(this.data.value, this.data.countrycode);
            } else {
                return this.data.types[this.data.type].verifyFuc(this.data.value);
            }
        },
        initDefaultType : function(){
            if(this.data.type===''){
                this.setData({
                    type : TYPE_TEL_OR_EMAIL
                });
            }
        },
        initDefaultPlaceHolder: function () {
            if (this.data.placeholder == '') {
                this.setData({
                    placeHolder: this.data.types[this.data.type].placeHolder
                })
            }
        },
        listener: function (str, result) {
            var eventDetail = {};
            var eventOption = {};
            eventDetail.pgyerResult = result;
            this.triggerEvent(str, eventDetail, eventOption);
        },
        refreshErrorReminder: function (isHide) {
            if (isHide) {
                this.setData({
                    errorReminder: ''
                });
            } else {
                this.setData({
                    errorReminder: this.data.types[this.data.type].errorMessage
                });
            }
        },
        /*** callingCode feature ***/
        initDefaultCountryCode: function () {
            if (this.data.countrycode == '') {
                this.setData({
                    countrycode: CONST.DATA.DEAFULT_COUNTRY_CODE
                });
            }
        },
        pickCallingCodeListener: function () {
            this.listener('tapcallingcode', '');
        },
        /*** get phone verification feature **/
        initDefalutPhoneVerificationLabel: function () {
            if (this.data.validationlabel == '') {
                this.setData({
                    validationlabel: CONST.DATA.DEFAULT_GET_PHONE_VALIDATION_LABEL_
                });
            }
        },
        phoneVerificationListener: function () {
            if (!this.data.active) {
                return;
            }
            this.startCountDown();
            this.listener('tapphoneverification', '');
        },
        startCountDown: function () {
            let that = this;
            var countDownNum = parseInt(this.data.countdown);
            this.setData({
                active: false,
                validationlabel: countDownNum + "s"
            });
            this.data.timer = setInterval(function () {
                countDownNum--;
                that.setData({
                    validationlabel: countDownNum + "s"
                });
                if (countDownNum == 0) {
                    that.stopCuntDown();
                }
            }, 1000);
        },
        stopCuntDown: function () {
            clearInterval(this.data.timer);
            this.setData({
                validationlabel: CONST.DATA.DEFAULT_REGET_PHONE_VALIDATION_LABEL,
                active: true,
            });
        },
    }
});
