import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
const Overview =()=> import('../views/dashboard/Overview.vue');
const Drugs =()=> import('../views/dashboard/Drugs.vue');
const SellingHistory =()=> import('../views/dashboard/SellingHistory.vue');
const Settings =()=> import('../views/dashboard/Settings.vue');
const Vendors =()=> import('../views/dashboard/Vendors.vue');
const Test =()=> import('../views/dashboard/Test.vue');

const routes=[
    {
        path:"/",
        component: LoginPage
    },
    {
        path:'/test',
        component: Test
    },
    {
        path:"/dashboard",
        component: Dashboard,
        redirect:'/dashboard/overview',
        children:[
            {
                path:'overview',
                component: Overview
            }, 
            {
                path:'drugs',
                component: Drugs
            }, 
            {
                path:'selling-history',
                component: SellingHistory
            },
            {
                path:'vendors',
                component: Vendors
            }, 
            {
                path:'settings',
                component: Settings
            }
        ]
    }
];

const router=createRouter({
    routes, 
    history:createWebHistory()
});

export default router;
