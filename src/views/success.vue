<template>
<div style="position: absolute;left:0;bottom:0;top:0;right:0;overflow:hidden;background:#000;">
    <div style="index:2;">
        <div class="signUp-logo"></div>
        <h1 class="signUp-title">报名成功</h1>
        <p class="signUp-txt">
            通过筛选后，工作人员会在三到五个工作日内联系您！
        </p>
    </div>
</div>
</template>

<script>
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';
	import { mapGetters } from 'vuex'

    export default{
        created: function() {
            tool.setPageTitle('报名成功');
		},
    }
</script>
<style>
    .signUp-logo {
        background-image: url('../asset/icon_suc.png');
        width: 102px;
        height: 102px;
        background-size: 102px;
        background-repeat: no-repeat;
        margin: 65px auto 40px;
    }
    
    .signUp-title {
        color: #9a9a9a;
        text-align: center;
        font-size: 22px;
        text-align: center;
    }
    
    .signUp-txt {
        text-align: center;
        color: #9a9a9a;
    }
</style>