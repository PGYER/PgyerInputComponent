<img src="https://img.shields.io/badge/release-v1.0.1-green.svg" style="float:left;width:94px;height20px">

#### 项目介绍：

这是一个多功能输入框组件，该组件是从『蒲公英小程序』登录页面中抽取出来。<br>
初衷是为了解决输入框功能的复用以及保证代码整洁。

#### 组件说明文档
payer-input-panel组件说明文档

该组件是从『蒲公英开发者服务平台』小程序的登录页面抽离出来的。

一、集成方式

1. 将组件中的文件目录拷贝到小程序当前目录文件下，包括以下目录的所有文件；

   /components

   /const

   /image

   /utils

2. 在需要使用组件的页面 json 文件夹下添加

   ```
     "usingComponents": {
       "pgyer-input": "/components/pgyer-input-panel/pgyer-input-panel"
     }
   ```

3. 在 wxml 文件中的调用

   ```
   <pgyer-input type="" value="" placeholder="" bindverifyevent="" ></pgyer-input>
   ```

 v1.0.0 版本：

二、通用属性说明列表：

| 属性名             | 类型          | 默认值                 | 说明                                       |
| --------------- | ----------- | ------------------- | ---------------------------------------- |
| value           | String      |                     | 输入框中的内容                                  |
| type            | String      | "telOrEmail"        | 表示输入框类型的，目前有四个类型（"tel","password","verificationCode",telOrEmail） |
| placeholder     | String      | 默认根据不同的type 显示不同的提示 | placeholder : 显示自定义值<br><br>placeholder 无自定义值通过类型分别显示默认值<br>tel ： 请输入电话号码 <br>telOrEmail : 请输入电话号码或者邮箱<br>verificationCode : 请输入验证码<br>password : 请输入密码 |
| reminder        | String      | 默认根据不同的type 显示不同的提示 | reminder : 显示自定义值<br><br>reminder 无自定义值通过类型分别显示默认值<br>tel ： 输入的手机号码有误 <br>telOrEmail : 输入的邮箱或者手机号码有误<br>verificationCode : 输入的验证码有误<br>password : 输入的密码有误 |
| confirm_type    | String      | "done"              | send : 右下角按钮为“发送”<br> search : 右下角按钮为“搜索”<br>next : 右下角按钮为“下一个”<br>go : 右下角按钮为“前往”<br>done  右下角按钮为“完成” |
| bindverifyevent | EventHandle |                     | 每次输入，根据 type 类型返回验证结果触发<br>event.detail.pgyerResult = "true"/"false" ： 返回 true (合法) / false (不合法) |
| bindconfirm     | EventHandle |                     | 点击完成按钮时触发，event.detail = {value: value}  |
| bindclear       | EventHandle |                     | 点击清楚按钮触发                                 |

**type = "tel" 特定属性**

| 属性名              | 类型          | 默认值  | 说明                |
| ---------------- | ----------- | ---- | ----------------- |
| country_code     | String      | 86   | 国家码               |
| bindcountry_code | EventHandle |      | 点击countrycode触发事件 |

**type = "verificationCode" 特定属性**

| 属性名                    | 类型          | 默认值     | 说明                                       |
| ---------------------- | ----------- | ------- | ---------------------------------------- |
| validationlabel        | String      | “获取验证码” | 注意：在倒计时完成或终止以后，默认的值改变为 “再次获取验证码”         |
| active                 | String      | 'fasle' | 获取验证码是否可以点击<br>false 不可点击<br>true 可以点击，并且开始倒计时 |
| count_down             | String      | 60      | 获取倒计时时间                                  |
| bindverification_label | EventHandle |         | 点击验证按钮触发事件                               |

#### 三、自定义属性和验证规则

1. 以上的四个默认值可以通过修改 `const/pgyerInputConsts.js`内容自定义

```
const DATA = {
  DEAFULT_COUNTRY_CODE: '86',
  DEAFULT_COUNT_DOWN_NUM : '60',
  DEFAULT_GET_PHONE_VALIDATION_LABEL_ : "获取验证码",
  DEFAULT_REGET_PHONE_VALIDATION_LABEL : "再次获取验证码",
}
```

停止倒计时的方法：

```
// wxml 定义组件 id
<pgyer-input id="component-id" value="" type="tel" ></pgyer-input>

//js 文件中
let component = this.selectComponent('#component-id');
component.stopCuntDown();    // 停止计时方法

```

2. 修改验证规则，可以通过修改 `utils/pgyerVerifyUtils.js` 文件中的方法
