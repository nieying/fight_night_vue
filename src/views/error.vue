<template>
    <div>
        <img class="errorImg" src="../asset/errorImg.png">
        <p class="errorTip">页面打开出错了<span>{{msg}}</span></p>
    </div>
</template>

<script>
    import {tool} from 'app-utils';

    export default {
        created: function() {
            tool.setPageTitle('页面打开出错了');
            this.msg = this.$root.errorMsg;
        },
        mounted: function() {
            tool.dynamicSetAppTips();
        },
        data() {
            return {
                msg: ''
            }
        }
    };

</script>

<style>

</style>
