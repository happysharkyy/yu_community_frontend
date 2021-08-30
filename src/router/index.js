import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "信息发布", requireAuth: true },
  },
    // 发布合辑
    {
      name: "series-create",
      path: "/series/create",
      component: () => import("@/views/series/Index"),
      meta: { title: "合辑发布", requireAuth: true },
    },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  {
    name: 'series-edit',
    path: '/series/edit/:id',
    component: () => import('@/views/series/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" },
  },
    // 详情
    {
      name: "series-detail",
      path: "/series/:id",
      component: () => import("@/views/series/Detail"),
      meta: { title: "详情" },
    },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
    // 检索
    {
      name: 'follow',
      path: '/member/follow',
      component: () => import('@/views/follow/Index'),
      meta: { title: '检索' }
    },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置', requireAuth: true }
  },

    // 热门
     {
      name: 'hot',
      path: '/hot',
      component: () => import('@/views/hot/Index'),
      meta: { title: '热门' }
    },
      // 动态
      {
        name: 'domain',
        path: '/domain',
        component: () => import('@/views/Domain'),
        meta: { title: '动态' }
      },
    
    //推荐
    {
      name: 'recommend',
      path: '/recommend',
      component: () => import('@/views/recommend/Index'),
      meta: { title: '推荐' }
    },
    //活动
    {
      name: 'activity',
      path: '/activity',
      component: () => import('@/views/activity/Index'),
      meta: { title: '活动' }
    },
      //参加的活动
      {
        name: 'activity-user',
        path: '/activity/user',
        component: () => import('@/views/activity/UserActivity'),
        meta: { title: '活动' }
      },
      // 活动详情
    {
      name: 'activity-detail',
      path: '/activity/:id',
      component: () => import('@/views/activity/Detail'),
      meta: { title: '详情' }
    },
    // 专栏
    {
      name: 'columns',
      path: '/columns',
      component: () => import('@/views/column/List'),
      meta: { title: '专栏' }
    },
    // 专栏详情页
    {
      name: 'column-detail',
      path: '/column/:id',
      component: () => import('@/views/column/Detail')
    },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
