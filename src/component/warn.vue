<template>
    <div class="yy-modal ng-isolate-scope" v-show="showDlg">
        <div class="yy-modal-overlay"></div>
        <div class="yy-modal-main">
            <div class="yy-modal-body">
                <div class="text-center" style="overflow:hidden">
                    <!--<h3 class="text-center yy-modal-title ng-binding ng-scope ng-hide" ng-show="DlgConfig.showTitle"-->
                        <!--ng-bind="DlgConfig.title"></h3>-->
                    <p class="text-center yy-modal-content">{{msg}}</p>
                    <div class="col-xs-12 yy-modal-btngroup " @click="clickFun()">
                        <a class="yy-modal-btn ng-binding" >确定</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import eventHub from 'src/eventHub'
    require('src/style/_modal.scss')

    export default{
        created:function() {
            var self = this;
            eventHub.$on('showWarn',function(obj) {
                self.showDlg = true;
                self.msg = obj.msg.replace(/<[\S\s]*?>/g, '');
                self.callBack = obj.callBack || function() {};
            })
        },
        data(){
            return {
                msg: '',
                showDlg:false,
                callBack:null
            }
        },
        methods:{
            clickFun:function() {
                this.callBack();
                this.showDlg = false;
            }
        }
    }
</script>
