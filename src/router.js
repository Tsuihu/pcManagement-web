import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue')
    },
    {
      path: '/registe',
      name: 'registe',
      component: () => import('./views/registe/Registe.vue')
    },
    {
      path: '/index',
      // name: 'index',
      component: () => import('./views/Index.vue'),
      children:[
        {
          path:'/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/home/Home.vue')
        },
        {
          path: '/pointlist',
          name: 'pointlist',
          component: () => import('./views/home/PointList.vue')
        },
        {
          path: '/boxlist',
          name: 'boxlist',
          component: () => import('./views/home/BoxList.vue')
        },
        {
          path: '/tubelist',
          name: 'tubelist',
          component: () => import('./views/home/TubeList.vue')
        },
        {
          path: '/people',
          name: 'people',
          component: () => import('./views/home/People.vue')
        },
        {
          path: '/collectors',
          name: 'collectors',
          component: () => import('./views/home/Collectors.vue')
        },
        {
          path: '/managers',
          name: 'managers',
          component: () => import('./views/home/Managers.vue')
        },
      ]
    },
  ],
});
