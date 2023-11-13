import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
const routes=[
    {
        path:"/",
        component: LoginPage
    },
    {
        path:"/dashboard",
        component: Dashboard
    }
];

const router=createRouter({
    routes, 
    history:createWebHistory()
});

export default router;
