<template>
    <div>
        <div id="content" style="position: absolute; top: 0; bottom: 34px;width:100%; overflow-y: scroll;-webkit-overflow-scrolling: touch;">
            <div class="my_ctn">
                <div>
                    <my-video
                        v-if="info.link"
                        :thumb="info.thumb"
                        :link="info.link"
                        :linkOther="info.link1"
                    ></my-video>
                </div>
                <div class="flex-row flex-middle pd-10px">
                    <div class="col-4 toolong-ellipsis" style="font-size:15px;">{{info.title}}</div>
                    <div class="col-8 text-right" style="color:#8d8f94;">
                        <img src="../asset/icon_watch.png" style="height:12px;" />
                        <span>{{readNumCal}}</span>&nbsp;&nbsp;&nbsp;
                        <img src="../asset/icon_msg.png" style="height:12px;" />
                        <span>{{commentNumCal}}</span>
                    </div>
                </div>
                <div class="border-t border-b pd-l-10px" style="height:50px;line-height:50px;font-size:16px;color:#9a9a9a;border-color:#45484a;">往期节目</div>
                <div class="img-block">
                    <router-link :to="'/passVideo/'+item.videoId" class="block" v-for="item in passVideos">
                        <div class="pd-10px pd-t-12px pd-b-12px border-b" style="border-color:#45484a;min-height:100px;">
                            <div style="position: absolute; width:164px;">
                                <img :src="item.thumb" style="width:144px;height:100px;display:block;" />
                            </div>
                            <div style="line-height: 1.1; width: 100%;padding-left: 158px; box-sizing: border-box; word-wrap: break-word;">
                                <div>
                                    <div style="margin-bottom: 8px;">{{item.name}}</div>
                                    <div style="margin-bottom: 8px;">·{{item.description}}</div>
                                    <div style="font-size: 12px;">{{item.readNum}}次播放</div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="border-b pd-l-10px" style="height:50px;line-height:50px;font-size:16px;color:#9a9a9a;border-color:#45484a;">评论</div>
                <div style="padding-left:10px;padding-right:12px;">
                    <div class="flex-row pd-tb-14px" style="padding-left:46px;" v-for="item in comments">
                        <div style="width:46px;position:absolute;margin-left:-46px;">
                            <img :src="item.img" class="" style="border-radius:50%;width:38px;height:38px;" />
                        </div>
                        <div class="" style="width:100%;color:#9a9a9a; border-bottom:1px solid #45484a;">
                            <div class="row">
                                <div class="width: 100%;line-height:28px;font-size:14px;">{{item.nick_name}}</div>
                                <div style="width: 110px;position: absolute;right: 0;margin-top: -18px;text-align: right;">
                                    <div @click="laud(item)" style="height:30px;line-height: 30px;padding-right: 5px;display:inline-block;">
                                        <i class="icon_like" v-bind:class="{like:item.is_laud==1}"></i>
                                        <span>{{item.laud_num}}</span>
                                    </div>
                                    <div style="display:inline-block;height:30px;line-height: 30px;padding-left: 5px;" @click="showComment('commentDiv'+item.comment_id)">
                                        <img src="../asset/icon_com.png" style="height:14px;margin-right:10px;vertical-align: text-top;">
                                    </div>
                                </div>
                            </div>
                            <div class="comment_time" style="font-size:11px;line-height:15px;height:15px;">{{item.create_at}}</div>
                            <div class="pd-b-2px comment_txt" style="font-size:14px;line-height:24px; padding-top:0;word-wrap: break-word;">{{item.comment_content}}</div>
                            <div style="margin-right:20px">
                                <div v-bind:class="'row none commentDiv commentDiv'+item.comment_id" style="margin-bottom:6px;">
                                    <div class="col-10">
                                        <input v-bind:name="'comment_'+item.comment_id" type="text" placeholder="我来评论一番" class="pd-lr-12px width-full" style="border-radius:2px;height:36px;font-size:14px;box-sizing:border-box"
                                        />
                                    </div>
                                    <div class="col-2">
                                        <button class="button pd-10px left" @click="sendMessage(info.videoId,item.comment_id)" style="position:relative; left:4px; background-color:#2b52b2;color:#FFF;border:none;border-radius:4px;width:51px; font-size: 14px; line-height:0;height:36px;  ">
                                    发布
                                </button>
                                    </div>
                                </div>
                            </div>

                            <div v-show="item.reply.length > 0" class="pd-b-5px pd-l-10px pd-r-15px" style="border-radius:3px;background:rgba(255,255,255,0.1); margin-bottom:15px">
                                <div v-for="(reply, index) in item.reply" v-bind:style="(index==0?'padding-top:10px;':'') + 'padding-bottom:4px;'">
                                    <span>{{reply.reply_nick_name}}：</span>{{reply.reply_content}}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="clear" style="height:80px;"></div>
            </div>
        </div>
        <div class="fixed bottom-say">
            <div class="row pd-10px" style="background-color: rgb(208, 214, 221); padding-top: 8px; padding-bottom: 8px; padding-right: 65px;">
                <input id="commentInput" name="commentVideo" type="text" placeholder="我来说一说" class="width-full pd-lr-12px" style="border-radius: 2px; height: 33px; box-sizing: border-box;font-size:14px;">
                <div class="button" @click="sendMessage(info.videoId)" style="background-color: rgb(43, 82, 178); color: rgb(255, 255, 255); border: none;
    width: 51px; position: absolute; right: 10px; margin-top: -33px; border-radius:3px;height: 33px;line-height: 33px;text-align: center;">
                    发布 </div>
            </div>
        </div>

        <!--</div>-->
    </div>
</template>
<script>
    import {tool} from 'app-utils';
    import eventHub from 'src/eventHub';
    import myVideo from '../component/myVideo';
    import login from '../login'

    export default {
        created: function () {
            login();
            this.init();
            tool.setPageTitle('精彩回顾');
            var query = this.$route.params;
            if (query.id) {
                this.info.videoId = query.id;
                this.videoId = query.id;
            }
            this.getInfo(this.videoId || "1");
        },
        updated: function(){
        },
        mounted: function () {
            this.listenScroll();
            //  var Width = window.innerWidth,
            //     Height = window.innerHeight;
            // $('#commentInput').focus(function(){
            //     var inputBoxContainer = $('.bottom-say')[0];
            //     // alert('jj');
            //     // 输入框获取焦点, 键盘完全弹出再调整输入框位置(因ios键盘弹出不会触发resize事件, 故延时600ms)
            //     setTimeout(function() {
            //         // 挂载this上, 或者声明一个全局变量, 用于在失去焦点时, 要不要执行调整代码(非第三方不调整)
            //         this.inputIsNotInView = notInView()
            //         // alert(this.inputIsNotInView);
            //         if (this.inputIsNotInView) {
            //             // Width, Height: 分别是键盘没有弹出时window.innerWidth和window.innerHeight
            //             // 88: 是第三方输入法比原生输入法多的那个tool bar(输入时显示带选项) 的高度, 做的不是太绝, 高度是统一的
            //             // ios第三方输入法的tool bar 甚至 键盘也被当作可视区域了(包含在键盘弹出时的window.innerHeight)
            //             // alert(Width);
            //             if (Width != 375) {
            //                 let bottomAdjust = (Height - window.innerHeight - 44) + 'px';
            //                 // alert(bottomAdjust);
            //                 $(inputBoxContainer).css('bottom', bottomAdjust)
            //             }
            //             else {
            //                 // 'iphone 6 6s, 需要额外减去键盘高度432(见下图), 还算有良心, 高度和原生保持一致')
            //                 let bottomAdjust = (Height - window.innerHeight - 44 - 432/2) + 'px'
            //                 // alert(bottomAdjust);
            //                 $(inputBoxContainer).css('bottom', bottomAdjust)
            //             }
            //         }
            //     }, 600)

            //     // // 失去焦点, 键盘开始收起, 隐藏inputBox; 等键盘完全收起, 再显示inputBox, 设置在底部, 避免闪跳
            //     // if (this.inputIsNotInView) {
            //     //     // display和opacity + bottom 会有闪跳
            //     //     $(inputBoxContainer).css({ 'opacity': 0, bottom: 0 })
            //     //     setTimeout(() => {
            //     //         $(inputBoxContainer).css('opacity', 1)
            //     //     }, 600)
            //     // }

            //     // //判断元素是否在可视区域，不在的话返回true, 在返回false
            //     function notInView() {
            //         // getBoundingClientRect 是获取定位的，很怪异, (iphone 6s 10.0 bate版不行)
            //         // top: 元素顶部到窗口（可是区域）顶部
            //         // bottom: 元素底部到窗口顶部
            //         // left: 元素左侧到窗口左侧
            //         // right: 元素右侧到窗口左侧
            //         // width/height 元素宽高
            //         let bottom = inputBoxContainer.getBoundingClientRect().bottom
                    
            //         // 可视区域高度 - 元素底部到窗口顶部的高度 < 0, 则说明被键盘挡住了
            //         if (window.innerHeight - bottom < 0) {
            //             return true
            //         }
            //         return false
            //     }
            // }).blur(function(){
            //     $('.bottom-say').css('bottom','0');
            // })
        },
        data() {
            return {
                videoId:1,
                userId: window.localStorage.noLogin ? 1 : window.localStorage.userId,
                userName: window.localStorage.nickName,
                page: 1,
                wechatToken: window.localStorage.wechatToken,
                info: {},
                passVideos: [{}],
                videoOptions: {
                    autoplay: true,
                    volume: 0.6,
                    //poster: 'http://covteam.u.qiniudn.com/poster.png'
                },
                comments: []
            }
        },
        computed: {
            commentNumCal: function() {
                if (this.info.commentNum && this.info.commentNum > 10000) {
                    return Math.floor(this.info.commentNum / 10000) 
                        + (this.info.commentNum % 10000 ? '万+' : '万')
                } else {
                    return this.info.commentNum;
                }
            },
            readNumCal: function() {
                if (this.info.readNum && this.info.readNum > 10000) {
                    return Math.floor(this.info.readNum / 10000) 
                        + (this.info.readNum % 10000 ? '万+' : '万')
                } else {
                    return this.info.readNum;
                }
            }
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                // debugger;
                this.getInfo(to.params.id||'1');
                // window.clearInterval(this.timer);
                window.scrollTo(0,0);
            }
        },
        components: {
            myVideo
        },
        methods: {
            init: function() {
                login()
                // const it = this;
                // if (/MicroMessenger/i.test(navigator.userAgent) && this.userName == '游客') {
                //     evh.$emit('showError', { msg: '微信认证跳转' });
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

                //     // if(this.userName=='游客'){
                //     //     var url = '/app-sdk/oauth2/getUserInfo?'
                //     //         url +='redirectToUrl='+encodeURIComponent(location.href);

                //     //     $.get(url,
                //     //         function(res){
                //     //             if(res.code==200){
                //     //                 // if(res.data.token){
                //     //                     window.localStorage.wechatToken=res.data.token;
                //     //                 // }
                //     //                 window.location.href =res.data.resultInfo;
                //     //             }
                //     //         }
                //     //     )
                //     // }else{
                //     //     it.addComment(videoId, commentId);
                //     // }
                // }
                // if(/MicroMessenger/i.test(navigator.userAgent) && it.userName && it.wechatToken){
                //     const that = it;
                //     var url = '/app-sdk/oauth2/getUserInfo?'
                //     url +='token=' +it.wechatToken;
                //     $.get(url,
                //         function(res){
                //             if(res.code==200){
                //                 if(res.data.userInfo){
                //                     that.userName=res.data.userInfo.nickName;
                //                     $.post('/app-server/app/saveUserInfo',
                //                         {
                //                             openId: res.data.userInfo.uId,
                //                             nickName: res.data.userInfo.nickName,
                //                             img: res.data.userInfo.iconUrl
                //                         }, function(res){
                //                             if(res.code === 200 && res.data) {
                //                                 that.userId = res.data.userId;
                //                             }
                //                         })
                //                 }else{
                //                     that.wechatToken = '';
                //                     window.localStorage.wechatToken='';
                //                 }
                //             }
                //         }
                //     )
                // }
            },
            listenScroll: function(){
                const it = this;
                $('#content').scroll(function(){
                    var scrollTop = $(this).scrollTop();
                    var itemCount = $(this).find('.flex-row').length;
                    var scrollHeight = $(this).height();
                    var flexs  =  $('#commentList').find('.flex-row');
                    var windowHeight=$(this).find('.my_ctn').height();

                    if( windowHeight<= scrollTop + scrollHeight){
                        it.page += 1;
                        it.loadMoreComment();
                　　}
                });
                //   $(window).scroll(function(){
                //   　　var scrollTop = $(this).scrollTop();
                //   　　var scrollHeight = $(document).height();
                //   　　var windowHeight = $(this).height();
                //   　　if(scrollTop + windowHeight == scrollHeight){
                //           it.page += 1;
                //           it.loadMoreComment();
                //   　　}
                //   });
            },
            loadMoreComment: function (){
                var it = this;
                $.getJSON('/app-server/video/selectComment?page=' + it.page + '&videoId=' + it.videoId+'&userId='+(this.userId||''), function (res) {
                    if (res.data && it.comments) {
                        it.comments = it.comments.concat(res.data);
                    }
                });
            },
            getInfo: function (videoId) {
                var it = this;
                $.get('/app-server/video/info?videoId=' + (videoId || this.videoId),function (res) {
                    it.info = res.data;
                    var videoId = it.info.videoId;
                    tool.setPageTitle(it.info.name);
                    it.sources = [{
                        src: it.info.link,
                        type: 'video/mp4'
                    }];
                    it.videoOptions.poster = it.info.thumb;
                    it.getPassVideos(videoId);
                    it.getComments(videoId);
                    it.addReadNum(videoId);
                });
            },
            getPassVideos: function (videoId) {
                var it = this;
                $.getJSON('/app-server/video/sonVideo?videoId=' + videoId ,function (res) {
                    // console.log(res);
                    it.passVideos = res.data;
                });
            },
            getComments: function (videoId) {
                var it = this;
                $.getJSON('/app-server/video/selectComment?videoId=' + videoId+'&userId='+(this.userId||''), function (res) {
                    // console.log(res);
                    it.comments = res.data;
                });
            },
            addReadNum: function (videoId) {
                var it = this;
                $.getJSON('/app-server/video/addOneReadNum?videoId=' + videoId, function (res) {
                    // console.log(res);
                });
            },
            sendMessage: function(videoId, commentId) {
                var it = this;
                // if(/MicroMessenger/i.test(navigator.userAgent) && this.userName=='游客'){
                //     var url = '/app-sdk/oauth2/getUserInfo?'
                //         url +='redirectToUrl='+encodeURIComponent(location.href);

                //     $.get(url,
                //         function(res){
                //             if(res.code==200){
                //                 // if(res.data.token){
                //                     window.localStorage.wechatToken=res.data.token;
                //                 // }
                //                 window.location.href =res.data.resultInfo;
                //             }
                //         }
                //     )
                // }else{
                    it.addComment(videoId, commentId);
                // }
            },
            addComment: function (videoId, commentId) {
                var it = this;
                var commentVideo = it.$el.querySelector('input[name="commentVideo"]').value;
                if (commentId) {
                    commentVideo = it.$el.querySelector('input[name="comment_' + commentId + '"]').value;
                }
                if (!commentVideo) {
                    eventHub.$emit('showError', {msg: '内容不能为空'});
                    return;
                }
                 $.post('/app-server/video/addComment', {
                    videoId: videoId,
                    parentId: commentId,
                    userId: window.localStorage.noLogin ? 1 : it.userId,
                    content: commentVideo
                },function (res) {
                    it.getComments(videoId);
                    if(commentId){
                        it.$el.querySelector('.commentDiv'+commentId).style.display='none';
                        it.$el.querySelector('input[name="comment_' + commentId + '"]').value='';
                    }else{
                        it.$el.querySelector('input[name="commentVideo"]').value='';
                        ++it.info.commentNum;
                    }
                });
            },
            showComment: function (commentDiv) {
                var it = this;
                var commentDivs = it.$el.querySelectorAll('.commentDiv');
                var commentDiv = it.$el.querySelector('.' + commentDiv);
                var isVisi = commentDiv.style.display == "block";
                //隐藏DIV
                for(var i=0;i<commentDivs.length;i++){
                    commentDivs[i].style.display = "none";
                }
                //显示DIV

                if(isVisi){
                    commentDiv.style.display ="none";
                }else{
                    commentDiv.style.display ="block";
                }
            },
            laud:function(item){
                var it = this;
                if(this.userName=='游客'){
                    var url = 'http://boji.kfyapp.com//app-sdk/oauth2/getUserInfo?'
                        url +='redirectToUrl='+encodeURIComponent(location.href);

                    $.get(url,
                        function(res){
                            if(res.code==200){
                                // if(res.data.token){
                                    window.localStorage.wechatToken=res.data.token;
                                // }
                                window.location.href =res.data.resultInfo;
                            }
                        }
                    )
                }else{
                    $.post('/app-server/video/laud',
                        {
                            userId:it.userId,
                            videoId:it.videoId,
                            commentId:item.comment_id,
                            isLaud:item.is_laud==1?'0':"1"
                        },
                        function(res){
                            if(item.is_laud==1){
                                item.is_laud=0;
                                --item.laud_num;
                            }else{
                                item.is_laud=1;
                                ++item.laud_num;
                            }
                        }
                    )
                }
            }
        }
    };


</script>
<style>
    .img-block a {
        color: #9a9a9a
    }
    /*.img-block a:first-child {
        color: #2b52b2;
    }*/
    
    #videoDiv {
        top: 0;
        width: 100%;
        height: 200px;
        background-color: #fff;
        z-index: 99;
        background-color: rgba(000, 1, 000, 0.1);
        position: absolute;
    }
    
    .icon_like {
        width: 16px;
        height: 13px;
        background-image: url(../asset/icon_lick.png);
        background-size: 16px;
        display: inline-block;
    }
    
    .icon_like.like {
        background-image: url(../asset/icon_lick_a.png);
    }
    
    .comment_time {
        font-size: 14px;
        padding: 2px 0 0;
    }
    
    .comment_txt {
        font-size: 16px;
        padding: 10px 0;
        line-height: 18px;
    }
    
    .bottom-say {
        bottom: 0;
        width: 100%;
        z-index: 2;
    }
    
    .toolong-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
</style>