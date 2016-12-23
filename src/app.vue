<template>
    <div id="app">
        <router-view></router-view>
        <warn></warn>
        <error-tip></error-tip>
        <load></load>
    </div>
</template>

<script>
    import warn from './component/warn'
    import errorTip from './component/errorTips'
    import load from './component/load'
    import eventHub from 'src/eventHub'

    export default {
        created: function() {
            var self = this;
        },
        data() {
            return {
            }
        },
        components: {
            warn,
            errorTip,
            load
        }
    };
    
            // if (/MicroMessenger/i.test(navigator.userAgent) && this.userInfo.name == '游客') {
            //     eventHub.$emit('showError', { msg: '微信认证跳转' });
            //     var url = '/app-sdk/oauth2/getUserInfo?'
            //     url += 'redirectToUrl=' + encodeURIComponent(location.href);

            //     $.get(url,
            //         function(res) {
            //             if (res.code == 200) {
            //                 // if(res.data.token){
            //                 window.localStorage.wechatToken = res.data.token;
            //                 // }
            //                 window.location.href = res.data.resultInfo;
            //             }
            //         }
            //     )
            // }
</script>

<style>

</style>