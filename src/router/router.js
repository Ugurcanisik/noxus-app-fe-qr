import Vue from "vue";
import VueRouter from "vue-router";
import ChildView from '../views/childView'
import Qr from '../views/qr'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: ChildView,
    children: [
      {
        path: '', redirect: '/qr',
      },
      {
        path: '/qr', component: Qr,
      },
    ]
  },
  {
    path: "*", redirect: "/",
  }
];

export const router = new VueRouter({
  mode: "history",
  routes
});
