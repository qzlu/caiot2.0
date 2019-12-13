import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/layout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component: () => import('../views/login')
  },
  {
    path:'/:id',
    component: Layout,//集团首页
    children:[
      {
          path:'blockSituation', //集团态势
          component: () => import('../views/home/blockSituation.vue')
      },
      {
          path:'systemOverview', //系统总览
          component: () => import('../views/home/systemOverview.vue')
      },
      {
          path:'comprehensiveRanking', //综合排名
          component: () => import('../views/home/comprehensiveRanking.vue')
      },
      {
          path:'alarm', //告警管理
          component: () => import('../views/alarm/alarmCount.vue')
      },
      {
          path:'energy', //能源管理
          component: () => import('../views/energy/energyCount.vue')
      },{
        path:'manage',
        component:() => import('../views/user/index.vue'),
        meta:{
          name:"用户管理"
        },
        children:[
          {
            path:'user',
            component:() => import('../views/user/user.vue'),
            meta:{
              name:'用户管理',
              formList:['05F1CE35-D4A6-40F9-818A-F8BB219E5A5D','05F1CE35-D4A6-40F9-818A-F8BB219E5A5D']
            }
          },
          {
            path:"/:id/manage/role",
            component:() => import('../views/user/role.vue'),
            meta:{
              name:'功能角色',
              formList:['775635D2-7B86-44B6-BEEB-D622BA572894','775635D2-7B86-44B6-BEEB-D622BA572894']
            }
          },
          {
            path:'/:id/manage/roleDetail/:roleId',
            component:() => import('../views/user/roleDetail.vue'),
            name:'roleDetail',
            meta:{
              name:'功能角色>分配权限'
            }
          },
          {
            path:'group',
            component:() => import('../views/user/group.vue'),
            meta:{
              name:'组织架构'
            }
          },
          {
            path:'organizational',
            component:() => import('../views/user/framework.vue'),
            meta:{
              name:'行政架构'
            }
          },
          {
            path:'ProjectManagement',
            component:() => import('../views/user/projectInfo.vue'),
            meta:{
              name:'项目信息'
            }
          },
          {
            path:'block',
            component:() => import('../views/user/block.vue'),
            meta:{
              name:'集团信息'
            }
          }
        ],
      }
  ]
  },
/*   {
    path:'',
    component: Layout,//集团首页
    children:[
        {
            path:'/blockSituation', //集团态势
            component: () => import('../views/home/blockSituation.vue')
        },
        {
            path:'/systemOverview', //系统总览
            component: () => import('../views/home/systemOverview.vue')
        },
        {
            path:'/comprehensiveRanking', //综合排名
            component: () => import('../views/home/comprehensiveRanking.vue')
        },
        {
            path:'/alarm', //告警管理
            component: () => import('../views/alarm/alarmCount.vue')
        },
        {
            path:'/energy', //能源管理
            component: () => import('../views/energy/energyCount.vue')
        },{
          path:'/manage',
          component:() => import('../views/user/index.vue'),
          meta:{
            name:"用户管理"
          },
          children:[
            {
              path:'/manage/user',
              component:() => import('../views/user/user.vue'),
              meta:{
                name:'用户管理'
              }
            },
            {
              path:'/manage/role',
              component:() => import('../views/user/role.vue'),
              meta:{
                name:'功能角色'
              }
            },
            {
              path:'/manage/roleDetail/:id',
              component:() => import('../views/user/roleDetail.vue'),
              name:'roleDetail',
              meta:{
                name:'功能角色>分配权限'
              }
            },
            {
              path:'/manage/group',
              component:() => import('../views/user/group.vue'),
              meta:{
                name:'组织架构'
              }
            },
            {
              path:'/manage/organizational',
              component:() => import('../views/user/framework.vue'),
              meta:{
                name:'行政架构'
              }
            },
            {
              path:'/manage/ProjectManagement',
              component:() => import('../views/user/projectInfo.vue'),
              meta:{
                name:'项目信息'
              }
            },
            {
              path:'/manage/block',
              component:() => import('../views/user/block.vue'),
              meta:{
                name:'集团信息'
              }
            }
          ],
        }
    ]
  }, */
  {
    path:'/waterSystem', //给排水系统
    component: () => import('../views/waterSystem/index.vue')
  },
  {
    path:'/smartParking', //智慧停车场
    component: () => import('../views/smartParking/index.vue')
  },
  {
    path:'/powerSystem', //供配电系统
    component: () => import('../views/powerSystem/index.vue')
  },
  {
    path:'/smartDoor', //智慧门禁
    component: () => import('../views/smartDoor/index.vue')
  },        {
    path:'/smartVideo', //智慧视频
    component: () => import('../views/smartVideo/index.vue')
  },
  {
    path:'*',
    component:() =>import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
