# my-project

> 20181111

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
首次进入通过wx.getsetting验证是否已经授权过获取个人信息scope.userInfo，若有则不跳转；若未授权过则弹出授权框让其授权；如果点击同意则存储个人信息，页面不跳转，如果是点击拒绝则跳转到授权页面带上参数authtype:userInfoFail，在授权页面根据authtype的值来显示按钮和文本提示，然后手动点击授权个人信息按钮，授权成功存储信息并带上原有的参数返回首页。
当点击发起或者助力时，如果未登陆则直接跳到授权页，此时携带的authType为空,所以授权页知道是点击手机号授权的行为，此时直接走相应步骤成功后携带原参数返回即可
