import { createRouter, createWebHistory } from "vue-router";
// import TestVue from '../TestVue.vue'
// import App from '../App.vue'
import Home from '@/components/Home.vue'
import Add from '@/components/add/index.vue'
import Detail from '@/components/detail/index.vue'
import DetailById from '@/components/detail/_id.vue'
import EditById from '@/components/edit/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add Home',
    component: Add
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,

  },
  {
    path: '/detail/:id',
    name: "DetailwithID",
    component: DetailById,
  },
  {
    path: '/edit/:id',
    name: "EditWithID",
    component: EditById,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
