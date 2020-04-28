import Vue from 'vue';
import Router from 'vue-router';
import { isAuthenticated } from '../components/utilitys/auth'
import Login from '@/components/login/Login';
import Dashboard from '@/components/dashboard/Dashboard';
import Loader from '@/components/loader/Loader';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Login,
            children: [
                {
                    path: 'login',
                    redirect: '/'
                }
            ],
            beforeEnter: function (to, from, next) {
                if (isAuthenticated()) {
                    next('/dashboard')
                }
                else {
                    next()
                }
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            children: [
                {
                    path: '',
                    redirect: 'loader'
                },
                {
                    path: 'loader',
                    component: Loader
                },
            ],
            beforeEnter: function (to, from, next) {
                if (!isAuthenticated()) {
                    next('/login')
                }
                else {
                    next()
                }
            }
        },
        {
            path: '**',
            redirect: '/'
        }
    ]
});
