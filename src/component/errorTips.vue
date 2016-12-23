<template>
    <div v-show="showErrorTip" class="errortip-ctn">
        <div class="errortip-ctnbg">
            <span ng-bind-html="errorTipMsg"><span class="errortip-iconface"></span>{{errorTipMsg}}</span>
        </div>
        <iframe frameborder=0 scrolling=no style="background-color:transparent; position: absolute; z-index: 9999; width: 100%; height: 100%; top: 0;left:0;"></iframe>
    </div>
</template>
<script>
    import eventHub from 'src/eventHub'

    export default{
        created:function() {
            var self = this;
            eventHub.$on('showError',function(obj) {
                self.showErrorTip = true;
                self.errorTipMsg = obj.msg.replace(/<[\S\s]*?>/g, '');
                self.duration = obj.duration || 3000;
            })
        },
        data(){
            return {
                showErrorTip:false,
                errorTipMsg: '',
                duration:0
            }
        },
        watch:{
            showErrorTip:function(val,oldval) {
                var self = this
                if (val) {
                    document.activeElement.blur();
                    var timer;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function() {
                        self.showErrorTip = false
                    },this.duration)
                }
            }
        }
    }
</script>

<style>
    .errortip-ctn {
        display: block;
        position: fixed;
        z-index: 100000;
        width: 100%;
        top: 30%;
        height: 1px;
        padding: 0px 20px;
        box-sizing: border-box;
        text-align: center;
    }
    
    .errortip-ctnbg {
        margin: 0 auto;
        background-color: #fff;
        border-radius: 6px;
        color: #000;
        padding: 16px;
        display: inline-block;
    }
    
    .errortip-iconface {
        background-image: url('../asset/icon_face.png');
        width: 25px;
        height: 25px;
        display: inline-block;
        background-size: 25px;
        vertical-align: bottom;
        margin-right: 12px;
    }
</style>