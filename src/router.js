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
        // {
        //   path: '/info',
        //   name: 'info',
        //   component: Info
        // },
        // {
        //   path: '/fundlist',
        //   name: 'fundlist',
        //   component: FundList
        // }
      ]
    },
  ],
});
