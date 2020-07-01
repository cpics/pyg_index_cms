import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/home',
    component: Layout,
    name: 'homeIndex',
    meta: { title: '首页', icon: 'dashboard' },
    redirect: '/home/banner',
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/home/banner'),
        meta: { title: 'banner管理' }
      },
      {
        path: 'showSite',
        name: 'showSite',
        component: () => import('@/views/home/showSite'),
        meta: { title: '展示站点管理' }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/home/brand'),
        meta: { title: '品牌活动管理' }
      },
      {
        path: 'case',
        name: 'case',
        component: () => import('@/views/home/case'),
        meta: { title: '案例管理' }
      },
      {
        path: 'partner',
        name: 'partner',
        component: () => import('@/views/home/partner'),
        meta: { title: '战略伙伴' }
      }
    ]
  },
  {
    path: '/site',
    component: Layout,
    name: 'siteIndex',
    meta: { title: '站点管理', icon: 'dashboard' },
    redirect: '/site/index',
    children: [
      {
        path: 'index',
        name: 'siteIndex',
        component: () => import('@/views/site/index'),
        meta: { title: '站点管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/hd',
    component: Layout,
    name: 'hd',
    meta: { title: '资讯&活动', icon: 'dashboard' },
    redirect: '/ hd/news',
    children: [
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/hd/news'),
        meta: { title: '资讯管理' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/hd/activity'),
        meta: { title: '活动管理' }
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    name: 'applyIndex',
    meta: { title: '预约管理', icon: 'dashboard' },
    redirect: '/apply/rongzi',
    children: [
      {
        path: 'rongzi',
        name: 'rongzi',
        component: () => import('@/views/apply/rongzi'),
        meta: { title: '申请融资', icon: 'dashboard' }
      },
      {
        path: 'ruzhu',
        name: 'ruzhu',
        component: () => import('@/views/apply/ruzhu'),
        meta: { title: '申请入驻', icon: 'dashboard' }
      },
      {
        path: 'canguan',
        name: 'canguan',
        component: () => import('@/views/apply/canguan'),
        meta: { title: '预约参观', icon: 'dashboard' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
