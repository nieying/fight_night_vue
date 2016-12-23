<template>
    <div class="pd-15px"
         style="color:#a2a2a2;background:url('../static/bg_info.png') no-repeat;background-size:contain;">
        <div style="font-size:16px;color:#9a9a9a;border-color:#45484a;margin-bottom: 29px;">支持本场比赛</div>

        <div class="row">
            <div class="col-2" style="color:#fff;line-height:37px;font-size:16px;">金额</div>
            <div class="x_pay_input">
                <input type="number" v-model="moneys" class="text-center x_input"/>
            </div>
        </div>
        <div class="row mg-t-10px" style="margin-top: 15px;">
            <div class="col-2">&nbsp;</div>
            <div class="x_pay_btn">
                <div class="button" @click="pay()">
                    立即支付
                </div>
            </div>
        </div>
        <div class="row mg-t-30px border-b pd-tb-10px" style="border-color:#45484a;">
            <div class="col-4" style="font-size:13px;">
                共 <span style="color:#FFF; font-size:17px;">{{personCount}}</span>人参与
            </div>
            <div class="col-8 text-right" style="color: #a2a2a2;font-size: 13px;">
                累计金额<span style="color:#FFF;"> ¥ {{amountCount}}</span>
            </div>
        </div>
        <div>
            <div class="flex-row flex-middle border-b" v-for="item in user" style="border-color:#45484a;height: 54px;line-height: 54px;">
                <div style="height: 54px;line-height: 54px;margin-right: 8px">
                    <img :src="item.img" class="" style="border-radius:50%;width:38px;height:38px;margin-top: 8px;"/>
                </div>
                <div class="col-6">{{item.nickName}}</div>
                <div class="col-4 text-right">
                    <span style="color:#FF5A5F;font-size: 14px;"> <span style="font-size: 12px;">¥</span> {{item.amount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {tool} from 'app-utils';
    var si;
    export default {
        created: function () {
            tool.setPageTitle('打赏');
            this.getInfo();
        },
        mounted: function () {

        },
        data(){
        return {
            user:[],
            amountCount: '',
            personCount: '',
            moneys:1, //支付金额
        }
    },
    methods: {
        getInfo:function(){
            var it = this,
            videoId = it.$route.query.videoId;
            $.get('/ds?videoId='+videoId, function (res) {
                if(res.code == 200 && res.data){
                    it.appRewardList = res.data.appRewardList;
                    it.amountCount = res.data.amountCount;
                    it.personCount = res.data.personCount;
                    it.user = res.data.user;
                    it.user.forEach(function(item,index){
                        item.img = item.img || '../asset/icon_suc.png';
                    })
                    it.appRewardList.forEach(function(item,index){
                        it.user[index].amount = item.amount;
                    });
                }
            })
        },

        //支付
         pay(){
            debugger;
            this.moneys > 200? 200:this.moneys;
            alert(typeof(this.moneys));
         }    
    }
};

</script>
<style>

    .pd-15px {
        padding: 15px;
    }

    .pd-tb-5px {
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .x_pay_input, .x_pay_btn {
        display: inline-block;
        width:130px;
        height:35px;
        line-height: 35px;
        border-radius:3px;
        font-size:16px;
        background:rgba(255,255,255,0.2);
        /*border: 1px solid red;*/
    }
    .x_input{
        width:120px;
        height:30px;
        line-height: 30px;
        background:rgba(255,255,255,0);
        color:#ff5a5f;
        font-size:16px;
        /*border: 1px solid red;*/
    }
    .x_pay_btn{
        background-color:#2b52b2;
        color:#FFF;
        border:none;
        text-align:center;
    }

</style>
