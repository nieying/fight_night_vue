import Vue from 'vue';
import VueRouter from "vue-router";

// 懒加载 http://router.vuejs.org/zh-cn/advanced/lazy-loading.html
const error = resolve => require(['./views/error.vue'], resolve);

const playSignUp = resolve => require(['./views/playSignUp.vue'], resolve);
const base = resolve => require(['./views/signitem/base.vue'], resolve);
const agent = resolve => require(['./views/signitem/agent.vue'], resolve);
const pic = resolve => require(['./views/signitem/pic.vue'], resolve);
const record = r => require.ensure([], () => r(require('./views/signitem/record.vue')), 'record');//resolve => require(['./views/signitem/record.vue'], resolve);
const recordEdit = r => require.ensure([], () => r(require('./views/signitem/recordEdit.vue')), 'record');//resolve => require(['./views/signitem/recordEdit.vue'], resolve);
const other = resolve => require(['./views/signitem/other.vue'], resolve);
const view = resolve => require(['./views/signitem/view.vue'], resolve);
const bobySignUp = resolve => require(['./views/bobySignUp.vue'], resolve);
const video = resolve => require(['./views/video.vue'], resolve);
const passVideo = resolve => require(['./views/passVideo.vue'], resolve);
const pay = resolve => require(['./views/pay.vue'], resolve);
const success = resolve => require(['./views/success.vue'], resolve);
const register = resolve => require(['./views/register.vue'],resolve);

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/error',
            component: error
        },
        {
            path: '/video',
            component: video
        },
        {
            path: '/passVideo',
            component: passVideo
        },
        {
            path: '/passVideo/:id',
            component: passVideo
        },
        {
            path: '/pay',
            component: pay
        },
        {
            path: '/playSignUp',  //选手报名
            component: playSignUp,
            children: [
                {
                    path: '',
                    component: base
                },
                {
                    path: 'base',
                    component: base
                }, {
                    path: 'agent',
                    component: agent
                }, {
                    path: 'pic',
                    component: pic
                }, {
                    path: 'record',
                    component: record
                }, {
                    path: 'recordEdit/:id',
                    component: recordEdit
                }, {
                    path: 'other',
                    component: other
                }, {
                    path: 'view',
                    component: view
                }]
        },
        {
            path: '/bobySignUp',  //宝贝报名
            component: bobySignUp
        },
        {
            path: '/success',
            component: success
        },
        {
            path:'/register',
            component:register
        }
        // {
        // 	path: '*',
        // 	redirect: '/error'
        // }
    ]
})  