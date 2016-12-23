<template>
    <div>
        <div id="playmsk" @click.prevent='hideMsk' v-show="!inited && isLiveStatus" style="position:fixed;top:0;bottom:0;left:0;width:100%;z-index:9999; background-color:#000">
            <img :src="info.broadImg" alt="" style="width:100%;">
        </div>
        <div style="height:210px;width:100%;position: relative" class="x_video">
        <div style="position: absolute;top:0;bottom:0;left:0;right:0;">
            <video id="html5player-video" v-if="isbroadcastStatus" data-setup="{}" webkit-playsinline="" preload="none"
                width="100%" height="100%" :poster="act.actImg" controls="controls">
                <source :src="sources.src">
                <!-- <source src="rtmp://123.126.62.53/internal/gedou"> -->
                <span>您的手机版本，网页版暂未能支持！</span>
            </video>
            <div v-else>
                <span class="expect_live"></span>
                <span class="expect_live_text">直播尚未开始</span>
            </div>
            <div id="videoDiv" style="position: absolute;z-index: 20;top: 0;left: 0;right: 0;bottom: 0; pointer-events: none;overflow: hidden;">
            </div>
        </div>
        </div>
        <div class="flex-row flex-middle pd-l-10px" style="height:47px; position: relative;background: #1a1f29;">
            <div style="font-size:15px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 50%;">{{act.actName}}</div>
            <div class="" style="color:#8d8f94;position: absolute;right: 10px;top:14px">
                <div class="text-center inline-block pd-lr-10px danmuDiv" :style="danmuCls" @click="showDanmu()">弹幕<span class="x_line" v-show="isShowLine"></span></div>
                &nbsp;&nbsp;&nbsp;
                <img src="../asset/icon_watch.png" style="height:12px;" />
                <span>{{readNumCal}}</span>&nbsp;&nbsp;&nbsp;
                <img src="../asset/icon_msg.png" style="height:12px;" />
                <span id="commentNum"></span>
            </div>
        </div>
        <div class="nav row" style="border-top: 1px solid #000;border-bottom: 1px solid #2a2f35;font-size:15px;background: #161a23;">
            <div v-if="tab==1" class="current col-4 text-center pd-tb-10px" style="border-bottom: 0;">互动聊天</div>
            <div v-else class="col-4 text-center pd-tb-10px" @click="onTab(1)">互动聊天</div>
            <div v-if="tab==2" class="current col-4 text-center pd-tb-10px" style="border-bottom: 0;">活动简介</div>
            <div v-else class="col-4 text-center pd-tb-10px" @click="onTab(2)">活动简介</div>
            <div v-if="tab==3" class="current col-4 text-center pd-tb-10px" style="border-bottom: 0;">日程安排</div>
            <div v-else class="col-4 text-center pd-tb-10px" @click="onTab(3)">日程安排</div>
        </div>
        <div v-show="tab==1" class="x_live_bg pd-10px" style="-webkit-overflow-scrolling: touch;">
            <div class="fixed" style="bottom:42px;z-index:2;right:-1px;">
                <router-link v-bind:to="'/pay?videoId='+info.brocastId" class="block">
                    <img src="../asset/icon_pay.png" style="border-radius:50%;width:75px;" />
                </router-link>
            </div>

<div id="commentList"  class="comment-list">
</div>
<div class="bottom-send">
    <div id="emoji_images" class="expression-imges hide">
    </div>
    <div class="fixed bottom-say">
        <div class="row pd-10px" style="background-color: rgb(208, 214, 221); padding-top: 8px; padding-bottom: 8px; padding-right: 65px;">

            <div class="action emoji" id="choose_emoj"><div class="icon emoji"></div></div>
            <div class="edit-wrap">
                <textarea v-place-holder id="commentInput" name="commentVideo" type="text" placeholder="我来说一说" class="width-full pd-lr-12px" style="position:relative;top:3px;border-radius: 2px; height: 33px;line-height: 25px; box-sizing: border-box; font-size: 14px;"></textarea>
                <div id="send_msg_btn" class="button" style="background-color: rgb(43, 82, 178); color: rgb(255, 255, 255); border: none; width: 51px; position: absolute; right: 10px; margin-top: -36px; border-radius: 3px; height: 33px; line-height: 33px; text-align: center;">
                    发布
                </div>

            </div>
        </div>
    </div>
</div>
        </div>
        <div v-show="tab==2" class="x_live_bg" style="-webkit-overflow-scrolling: touch;padding: 25px 21px; position: absolute; width: 100%; box-sizing: border-box; top: 301px; bottom: 0px; overflow-y: auto;">
            <div class="text-center" style="color:#ffda44;font-size:20px;line-hight:20px;padding-bottom:7px;">{{act.actName}}</div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">赛事地点：</span>
                <span style="color:#8f9091;">{{act.actAddr}}</span>
            </div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">赛事时间：</span>
                <span style="color:#8f9091;">{{act.beginTime}} &nbsp;&nbsp;- &nbsp;&nbsp;{{act.endTime}}</span>
            </div>
            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">赛事公告：</span>
                <span style="color:#8f9091;">{{act.actDes}}</span>
            </div>
        </div>
        <div v-show="tab==3" class="x_live_bg" style="-webkit-overflow-scrolling: touch;padding:25px 21px;position: absolute; width: 100%; box-sizing: border-box; top: 301px; bottom: 0px; overflow-y: auto;">
            <div class="text-center" style="color:#fff;font-size:20px;line-hight:20px;padding-bottom:7px;">{{act.actName}}</div>

            <div style='padding:4px 0;line-hight:22px;'>
                <span style="color:#fff;">开赛仪式：</span>
                <span style="color:#8D8E92;">{{plan.planRite}}</span>
            </div>
            <div style="padding:4px 0;line-hight:22px;">
                <span style="color:#fff;">比赛时间：</span>
                <span style="color:#8D8E92;">{{plan.planTime}}</span>
            </div>
            <div style="padding:4px 0;line-hight:22px;color:#8D8E92;"> {{plan.planContent}}
            </div>
        </div>
    </div>
</template>
<style>
    .nav {}
    
    .nav .current {
        background-color: #2B51B2;
        border-bottom: solid 3px #FFF;
    }
    
    #textStyle {
        position: absolute;
        font-size: 14px;
        color: #fff;
    }
    
    .bottom-say {
        bottom: 0;
        width: 100%;
        z-index: 2;
        left: 0;
    }
    
    .x_video {
        position: relative;
    }
    
    .x_line {
        border-bottom: 1px solid #fff;
        width: 36px;
        display: inline-block;
        position: absolute;
        left: 2px;
        transform: rotate(-27deg);
        transform-origin: right bottom;
    }
    
    .expect_live {
        display: inline-block;
        width: 33px;
        height: 38px;
        line-height: 210px;
        position: absolute;
        left: 123px;
        top: 80px;
        background: url(./../asset/expect_live.png) no-repeat;
        background-size: 100% 100%;
    }
    
    .expect_live_text {
        position: absolute;
        left: 161px;
        color: #2b52b2;
        font-size: 16px;
        line-height: 210px;
    }
    
    .x_live_bg {
        padding-bottom: 52px;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        top: 301px;
        bottom: 0;
        overflow: auto;
        bottom: 0;
        background: url(./../asset/live_bg.png);
        background-size: cover;
    }
    
    .danmuDiv {
        color: #FFF;
        border-radius: 20px;
        font-size: 12px;
    }
    
    .barrage {
        position: absolute;
        bottom: 70px;
        right: -500px;
        display: inline-block;
        width: 500px;
        z-index: 99999
    }
    
    .barrage_box {
        padding-right: 8px;
        height: 40px;
        display: inline-block;
        border-radius: 25px;
        transition: all .3s;
    }
    
    .barrage_box .portrait {
        display: inline-block;
        margin-top: 4px;
        margin-left: 4px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
    }
    
    .barrage_box .portrait img {
        width: 100%;
        height: 100%;
    }
    
    .barrage_box div.p a {
        margin-right: 2px;
        font-size: 18px;
        color: #fff;
        line-height: 40px;
        margin-left: 18px;
    }
    
    .barrage_box div.p a:hover {
        text-decoration: underline;
    }
    
    .barrage .z {
        float: left !important;
    }
    
    .barrage a {
        text-decoration: none;
    }

    /*评论*/

    .one-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
        height: 40px;
    }
    .one-list{
        position: relative;
        /*padding:  10px 10px 5px 10px;*/
    }
    .one-list li,.u-name{
        display: inline-block;
        line-height: 40px;

    }
    .one-list .user-img{
        width: 40px;
        height: 40px;
        position: absolute;

    }
    .one-list .u-name{
        font-size: 14px;
        padding-left: 45px;
    }
    .add-bottom-after:after{
        content:"";
        position: absolute;
        height: 1px;
        background: #e1e4ec;
        -webkit-transform: scaleY(.5);
        width: 100%;
        left: 0;
        bottom: 0;
    }
    .one-list .time{
        position: absolute;
        right: 10px;
    }
    .one-list .contet{
        line-height: 30px;
    }
    .icon.emoji{
        background: url(/m/static/img/icons.png);
        background-position: -65px -154px;
        width: 25px;
        height: 25px;
        display: block;
        position: relative;
        right: -5px;
        background-size: 350px 230px;
        top: 10px;
    }
    .action {
        margin-right: 5px;
        float: left;
    }
    .bottom-send{
        position: relative;
    }
    /*.bottom-send input{*/
        /*margin-left: 30px;*/
    /*}*/
    .bottom-send .action{
        position: absolute;
    }
    .edit-wrap{
        widows: 100%;
        padding: 0 0 0 35px;
        box-sizing: border-box;
    }
    .expression-imges{
        background: white;
        left:0;
        box-sizing: border-box;
        z-index: 2;
        /* border: 1px solid; */
        width: 100%;
        position: fixed;
        bottom: 48px;
        padding: 10px;
    }
    .expression-imges ul{
        padding: 0 ;
        margin: 0;
    }
    .expression-imges li{display:inline-block;padding: 0;text-align:center}
    .expression-imges img{width:25px}
    .hide{
        display: none;
    }
   .comment-list{
       margin-bottom: 70px;
   }

   /**/

           .user-img{
            border-radius: 40px;
        }
        .contet,.time{
            color:#909193;
        }
        .one-list .contet{
            line-height: 20px;
        }
        .edit-wrap textarea{
            border: none;
        }
        .one-list.add-bottom-after:after{
            display: none;
        }

        .one-list ul{
            margin-left: 45px;
            position: relative;
        }
        .one-list .user-img{
            left: -45px;
        }
        .one-list .u-name{
            position: absolute;
            left: -45px;
            top:5px
        }
        .one-list .contet{
            padding-left: 45px;
             position: relative;
        }
        .content-line{
            width: 100%;
            padding-left: 45px;
            box-sizing: border-box;
            padding-top: 5px;

        }
        .line-bg{
            width: 100%;
            background: #909193;
            height: 1px;
            box-sizing: border-box;
        }
        .one-list ul{
            height: 30px;
        }
        .one-list li, .u-name{
            line-height: 30px;
        }
        .one-list .user-img{
            top: 10px;
        }
        .one-list .contet{
            word-break:break-all; /*支持IE，chrome，FF不支持*/
            word-wrap:break-word;/*支持IE，chrome，FF*/
        }
</style>
<script>
    import { Barrager } from 'src/lib/zepto.barrager';
    import { tool } from 'app-utils';
    import eventHub from 'src/eventHub';
    import myVideo from 'vue-video';
    import login from '../login'

let inited = false;
    var si;
    export default {
        created: function() {
            var it = this;
            tool.setPageTitle('赛事直播');
            if (!it.$data.isShowDanmu) {
                it.$data.isShowLine = true;
                this.$data.danmuCls = {
                    'border': '1px solid #fff',
                    'background-color': "rgba(0,0,0,0)"
                };
            }
            this.inited = inited;
        },
        mounted: function() {
            login()
            setTimeout(() => {
                this.getInfo(1);
                inited = true;
            }, 10)
        },
        data() {
            return {
                danmuCls: {
                    border: '1px solid #2b52b2',
                    'background-color': '#2b52b2'
                },
                src: '',
                poster: '',
                video: '',
                tab: 1,
                videoOptions: {
                    autoplay: false,
                    volume: 0.6,
                },
                info: {
                    id: 1,
                    videoId: '',
                    chatRoomId: ''
                },
                sources: {
                    src: ''
                },
                watchCount: 0,//评论数量
                msgCount: 0,//观看人数
                act: {
                    actName: '',
                    actImg: ''
                },
                plan: {},
                token: '',
                userInfo: {
                    name: '游客',
                    url: 'http://boji.kfyapp.com/static/img/user.png',
                    id: 0
                },
                wechatToken: '',
                comments: [],
                backupComments: [],
                isShowLine: false,
                isShowDanmu: false,
                isbroadcastStatus: false,
                isLiveStatus: true,
                inited: false
            }
        },
        computed: {
            // 计算评论数量
            commentNumCal: function() {
                if (this.msgCount && this.msgCount > 10000) {
                    return Math.floor(this.msgCount / 10000) 
                        + (this.msgCount % 10000 ? '万+' : '万')
                } else {
                    return this.msgCount;
                }
            },
            // 计算观看人数
            readNumCal: function() {
                if (this.watchCount && this.watchCount > 10000) {
                    return Math.floor(this.watchCount / 10000) 
                        + (this.watchCount % 10000 ? '万+' : '万')
                } else {
                    return this.watchCount;
                }
            }
            // myVideo
        },
        methods: {
            // 获取直播信息
            getInfo: function(videoId) {
                var it = this;
                $.get('/app-sdk/broad/createStream?brocastId= ' + videoId, function(res) {
                    debugger;
                    it.info = res.data || {};
                    it.info.videoId = videoId;
                    it.info.chatRoomId = it.info.chatRoomId || 1;
                    var videoId = it.info.brocastId;
                    var chatRoomId = it.info.chatRoomId;
                    it.watchCount = res.data.num;
                    // 初始化评论
                    R_chatRoom.register();
                    R_chatRoom.initPage({
                        roomId: it.info.chatRoomId,
                        broadId: it.info.brocastId,
                    });

                    it.sources = {
                        src: it.info.hlsPullUrl,
                        poster: 'static/activity_intro.jpg'
                    };
                    var data = res.data || {};
                    it.isbroadcastStatus = it.isLiveStatus = data.broadcast_status == 1;
                    var that = it;

                    setTimeout(function() {
                        it.isLiveStatus = false;
                    }, 3000);

                    $.get('/app-sdk/broad/getActivity?broadId=' + videoId, function(res) {
                        if (res.code == 200 && res.data) {
                            that.act.actName = res.data.actName;
                            that.act.actDes = res.data.actDes;
                            that.act.beginTime = res.data.beginTime;
                            that.act.endTime = res.data.endTime;
                            that.act.actAddr = res.data.actAddr;
                            that.act.actImg = res.data.actImg;
                        }
                    })

                    $.get('/app-sdk/broad/getPlan?broadId=' + videoId, function(res) {
                        if (res.code == 200 && res.data) {
                            that.plan.planContent = res.data.planContent;
                            that.plan.planRite = res.data.planRite;
                            that.plan.planTime = res.data.planTime;
                        }
                    })
                });
            },
            hideMsk: function() {
                $('#playmsk').hide();
            },
            onTab: function(tab) {
                this.tab = tab;
            },
            play: function() {
                var video = document.getElementById("video");
                if (!video.paused) {
                    video.pause();
                } else {
                    video.play();
                }
            },
            toPay: function(id) {
                this.$router.push('pay');
            },
            showDanmu: function() {
                var it = this;
                if (!it.isShowDanmu) {
                    // 开启弹幕
                    it.$data.isShowLine = false;
                    this.$data.danmuCls = {
                        'background-color': "#2b52b2",
                        border: '1px solid #2b52b2'
                    };
                } else {
                    // 关闭弹幕
                    it.$data.isShowLine = true;
                    this.$data.danmuCls = {
                        'background-color': "rgba(0,0,0,0)",
                        'border': '1px solid #fff'
                    };
                    $('#videoDiv').barrager.removeAll();               
                  }
                it.isShowDanmu = !it.isShowDanmu;
                window._video_isShowDanmu = it.isShowDanmu;
            },
        }
    };
</script>
