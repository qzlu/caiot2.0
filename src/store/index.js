import Vue from 'vue'
import Vuex from 'vuex'
import {Post} from '@/request/api.js'
import router from '../router'
Vue.use(Vuex)
/**
 * 递归遍历使得一级菜单的路由为其子菜单第一个页面
 */
const formatterMenu = function (data){
  data.forEach(menu => {
      if(menu.ListData&&menu.ListData.length>0){
          let children = menu.ListData[0]
          if(children.ListData&&children.ListData.length>0){
              menu.FURL = formatterMenu([children])[0].FFunctionURLAddress
          }else{
              menu.FURL = children.FURL
          }
      }
  })
  return data
}
const lazyLoad = function(path){
  return () => import(`@/views${path}`)
}
//生成路由
const generaMenu = function(data,arr = []){
  arr = data.map(menu => {
      if(menu.FParentGUID =='00000000-0000-0000-0000-000000000000'){
        let children
        if(menu.ListData&&menu.ListData.length>0){
            children = generaMenu(menu.ListData,[])
        }
/*         if(menu.FMenuName == '用户管理'){
          children.push(
              {
                path:'/manage/roleDetail/:id',
                component:() => import('../views/user/roleDetail.vue'),
                name:'roleDetail',
                meta:{
                  name:'功能角色>分配权限'
                }
              },
          )
        } */
        return {
            path:menu.FFunctionURLAddress,
            /* name:menu.FFunctionURLAddress, */
            component:lazyLoad(menu.FComponent||'/404.vue'),
            redirect:menu.FURL,
            children:children,
            meta: {
                title: '千仞云平台',
                requireAuth: true,
                FGUID:menu.FGUID
            },
        }
      }else{
          return {
              path:menu.FURL.replace(/\/+\d+\//,/:id/),
              /* name:menu.FFunctionURLAddress, */
              component:lazyLoad(menu.FComponent||'/404.vue'),
              children:menu.FChildMenu&&menu.FChildMenu.length>0?generaMenu(menu.FChildMenu,[]):[],
              meta: {
                  title: '千仞云平台',
                  requireAuth: true,
                  FGUID:menu.FGUID
              },
          }
      }
  })
  return arr
}
export default new Vuex.Store({
  state: {
    token:null,
    projectId:0,
    FContacts:'',
    userType:null,
    projectName:'',
  },
  mutations: {
  },
  actions: {
    /**
     * 获取用户菜单
     */
    getMenus({state},formID){
      return new Promise((resolve,reject) => {
        Post('QueryUsersMenuTree',{Ftype:1,FFormID:formID})
        .then((result) => {
          let menuData = result.FObject; //匹配路由名
          let menuList = formatterMenu(menuData)
          sessionStorage.setItem(`menuData-${formID}`,JSON.stringify(menuList))
          resolve()
        }).catch((err) => {
          reject(err)
        });
      })
    },
    addRoute({state},menuData){
      /* let menuData = JSON.parse(sessionStorage.getItem('menuData'))||[] */
      if(Array.isArray(menuData)&&menuData.length>0){
          let homeRoutes = generaMenu(menuData)
          let routers = [
              {
                  path: '/:id',
                  name: 'home',
                  component: () => import('@/views/layout/layout.vue'),
                  /* redirect: `${homeRoutes[0]?homeRoutes[0].path:""}`,//子路由设置默认页 */
                  children: homeRoutes
              }
          ]
          console.log(routers)
          router.addRoutes(routers)
      }
  }
  }
})