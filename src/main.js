import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App.vue';
import router from './routes';
import eventHub from 'src/eventHub';
import Directives from 'src/directive/index';
import { tool } from 'app-utils';
import directives from 'src/directive/index';
import store from 'src/vuex/store';

window.Vue = Vue;

window.Utils = {
    formatStringDate: function (date, format) {
        if (!date) {
            return date;
        }
        var addZero = function (val) {
            return /^\d{1}$/.test(val) ? '0' + val : val;
        };
        format = format || 'yyyy-MM-dd';
        var date = new Date(date),
            year = date.getFullYear(),
            month = addZero(date.getMonth() + 1),
            day = addZero(date.getDate()),
            hours = addZero(date.getHours()),
            minutes = addZero(date.getMinutes()),
            seconds = addZero(date.getSeconds());
        return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
    }
};

// 初始化全局css
require('./style/app.scss');
require('./style/luck.scss');
Directives.init();
FastClick.attach(document.body, {});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
var rootVue = new Vue({
    data: {
    },
    store,
    created: function () {
        var hub = eventHub;

        // $.ajaxSettings.traditional = true;
        $.ajaxSettings.dataType = 'json';
        $.ajaxSettings.processData = false;

        $(document).on('ajaxBeforeSend', function (e, xhr, options) {
            // hub.$emit('loading');
            // options.traditional = true;
            // options.dataType = 'json';
            // options.processData = false;
            if (options.type.toUpperCase() == 'POST') {
                options.data = JSON.stringify(options.data);
                xhr.setRequestHeader('Content-Type', 'application/json')
            }
        });

        $(document).on('ajaxComplete', function (xhr, options) {
            hub.$emit('loadend');
            // // 当网络错误时统一处理
            if (!options.status == 200) {
                hub.$emit('showError', {
                    msg: '网络异常,请稍后重试!',
                })
            }

            if (options.response) {
                try {
                    var r = JSON.parse(options.response);

                    if (!((options.responseURL.indexOf('appMsg/getListMsg') !== -1) && 0 === r.code || 200 === r.code)) {
                        hub.$emit("showError", {
                            msg: r.msg || "请求错误"
                        })
                    }
                } catch (ex) {
                    console.log(ex);
                }
            }

        });
    },
    methods: {
    },
    router: router,
    http: {
        root: '/root',
        before: function (request) {
            // abort previous request, if exists
            // if (this.previousRequest) {
            // 	this.previousRequest.abort();
            // }
            // // set previous request on Vue instance
            // this.previousRequest = request;
        }
    },
    render: h => h(App)
}).$mount('#app');
directives.init();

// var baseUrl = 'http://120.25.235.159:8080';
//var baseUrl = 'http://192.168.0.105:8080';
//var baseUrl = 'http://192.168.31.48:8080';
// var baseUrl = '';
// Vue.http.options.emulateJSON = true;
// Vue.http.interceptors.push((request, next) => {
//     // 在发起请求之前 loading 处理
//     eventHub.$emit('loading');
//     request.url = baseUrl + request.url;
//     next((response) => {
//         eventHub.$emit('loadend');
//         // 当网络错误时统一处理
//         if (!response.ok) {
//             eventHub.$emit('showError', {
//                 msg: '网络异常,请稍后重试!',
//             })
//         }
//         if (response.body && response.body.code) {
//             if (!response.body.code.toString().startsWith(2)) {
//                 eventHub.$emit('showError', {
//                     msg: response.body.msg || '请求错误'
//                 })
//             }
//         }
//         return response;
//     });
// });

// // 每次路由之前请求该方法
// router.beforeEach(function (to, from, next) {
//     next();
// });
