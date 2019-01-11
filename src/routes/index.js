import BreezeContainer from '@/containers/Breeze'
import HomeContainer from '@/containers/Home'

/**
 * title  链接名称
 * path 路由地址
 * exact  路由渲染完全匹配
 * component  路由组件
 * routes 子路由
 */
const routes = [
  {
    title: '首页',  
    path: '/breeze',
    exact: true,
    component: BreezeContainer,
    // routes: 子路由 格式和本文件一致
  },
  {
    title: 'home',
    path: '/home/:id',
    component: HomeContainer,
    // routes: 子路由 格式和本文件一致
  },
]

export default routes