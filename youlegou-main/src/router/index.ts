import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('../views/Login.vue') },
    {
      path: '/index',
      component: () => import('../views/Index.vue'),
      children: [
        { path: '', redirect: '/index/welCome' },
        { path: '/index/welCome', name: '统计', component: () => import('../views/WelCome.vue') },
        {
          path: '/index/userManagement', name: '用户管理', component: () => import('../views/userManagement/UserManagement.vue'),
          children: [
            { path: '', redirect: '/index/userManagement/userList' },
            { path: '/index/userManagement/userList', name: '用户列表', component: () => import('../views/userManagement/UserList.vue') }
          ]
        },
        {
          path: '/index/rightsManagement', name: '权限管理', component: () => import('../views/rightsManagement/RightsManagement.vue'),
          children: [
            { path: '', redirect: '/index/rightsManagement/userList' },
            { path: '/index/rightsManagement/RolesList', name: '角色列表', component: () => import('../views/rightsManagement/RolesList.vue') },
            { path: '/index/rightsManagement/rightsList', name: '权限列表', component: () => import('../views/rightsManagement/RightsList.vue') }
          ]
        },
        {
          path: '/index/goodsManagement', name: '商品管理', component: () => import('../views/goodsManagement/GoodsManagement.vue'),
          children: [
            { path: '', redirect: '/index/goodsManagement/goodsList' },
            { path: '/index/goodsManagement/goodsList', name: '商品列表', component: () => import('../views/goodsManagement/GoodsList.vue') },
            { path: '/index/goodsManagement/classificationParameters', name: '分类参数', component: () => import('../views/goodsManagement/ClassificationParameters.vue') },
            { path: '/index/goodsManagement/productCategory', name: '商品分类', component: () => import('../views/goodsManagement/ProductCategory.vue') }
          ]
        },
        {
          path: '/index/orderManagement', name: '订单管理', component: () => import('../views/orderManagement/OrderManagement.vue'),
          children: [
            { path: '', redirect: '/index/orderManagement/orderList' },
            { path: '/index/orderManagement/orderList', name: '订单列表', component: () => import('../views/orderManagement/OrderList.vue') },
          ]
        }
      ]
    },
    { path: '/index/dataView', component: () => import('../views/DataView.vue') }
  ]
})
export default router