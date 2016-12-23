<template>
    <div class="loader-container ng-hide" v-show="loading">
        <div class="loader-bg"></div>
        <div class="loader"><i class="loader-round"></i></div>
    </div>
</template>
<script>
    import eventHub from 'src/eventHub'
    require('src/style/_loader.scss')

    export default{
        created:function() {
            var self = this;
            eventHub.$on('loading',function() {
                self.loading = true;
            });
            eventHub.$on('loadend',function() {
                self.loading = false;
            })
        },
        data(){
            return{
                loading: false
            }
        }
    }
</script>
