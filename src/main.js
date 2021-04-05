//导入配置项
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Qs from 'qs' //引入Axios 将对象序列化成URL的形式
import jQuery from './assets/js/jquery-3.4.1.js' //导入jQuery
import jsonp from 'jsonp' //导入jsonp
// 引入icon-font图标地址

//引入公共组件

//将axios添加到Vue实例上面，这样就能全局使用了(使用的时候就使用--- $http)。 $ -> 代表实例属性 实例方法
Vue.prototype.$http = axios
Vue.prototype.$Qs = Qs
Vue.prototype.$ = jQuery
Vue.prototype.$jsonp = jsonp
//给axios设置一个公共地址
axios.defaults.baseURL = 'http://127.0.0.1:5978/'

//阻止生产模式的一些消息
Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
