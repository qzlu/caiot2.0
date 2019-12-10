import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
Vue.use(Element)
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css-font/iconfont.css'
import '@/assets/css/reset.css'
import '@/assets/css/reset-el-table.scss'
import './assets/css/common.scss'
Vue.config.productionTip = false
import {post} from './request/http.js'
Vue.prototype.$post = post
Vue.config.productionTip = false
store.dispatch('addRoute')
router.beforeEach((to, from, next) => {
  let {token, projectID}= to.query
  NProgress.start()
  if(token){
      sessionStorage.setItem('FToken',token)
      sessionStorage.setItem('inIframe',1)
  }
  if(projectID){
      sessionStorage.setItem('projectID', projectID)
  }
  token = token || sessionStorage.getItem('FToken')
  if(to.path !== '/login'&&!token){
    next({path:'/login'})
    NProgress.done()
  }else{
    next()
    NProgress.done()
  }
})
router.afterEach(()=> {
	NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
