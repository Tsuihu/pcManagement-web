import Vue from "vue";
import Router from "vue-router";
import Login from './views/login/Login.vue'
import Registe from './views/registe/Registe.vue'
import Index from './views/Index.vue'
import Home from './views/home/Home.vue'


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
      component: Login
    },
    {
      path: '/registe',
      name: 'registe',
      component: Registe
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children:[
        {
          path:'/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: Home
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
      ]
    },
  ],
});
