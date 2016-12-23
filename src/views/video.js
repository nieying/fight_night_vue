
import { tool } from 'app-utils';
import eventHub from 'src/eventHub';
import myVideo from 'vue-video';
var si;
export default {
    created: function () {
        var it = this;
        tool.setPageTitle('赛事直播');
        this.getInfo(1);
    },
    mounted: function () {

    },
    data() {
        return {
            src: '',
            poster: '',
            video: '',
            tab: 1,
            videoOptions: {
                autoplay: true,
                volume: 0.6,
            },
            info: {
                id: 1,
            },
            sources: {
                src: ''
            },
            watchCount: 0,
            msgCount: 0,
            act: {
                actName: ''
            },
            plan: {},
            token: '',
            userInfo: {
                name: '160',
                url: 'http://iiio.com/i.jpg',
                id: 1
            }
        }
    },
    components: {
        myVideo
    },
    methods: {
        getInfo: function (videoId) {
            var it = this;
            $.get('/app-sdk/broad/createStream?brocastId=' + videoId, function (res) {
                // debugger;
                it.info = res.data;
                var videoId = it.info.brocastId;
                var chatRoomId = it.info.chatRoomId;

                it.sources = {
                    src: it.info.hlsPullUrl,
                    // src:'http://hls.yy.com/newlive/95825168_2551983005_10057.m3u8?org=huya&appid=0&uuid=6c7ee09819a64ad59ae708e591a41c87&t=1481117374&tk=c462967700ef00244466a1e4723837b4&uid=0',
                    // type: 'application/vnd.apple.mpegurl'
                    poster: 'static/activity_intro.jpg'
                };

                it.video = '<video id="html5player-video" data-setup="{}" webkit-playsinline="" preload="none" width="100%" height="100%" poster="' + it.sources.poster + '" controls="controls">' +
                    '<source src="' + it.sources.src + '">' +
                    '<span>您的手机版本，网页版暂未能支持！</span>' +
                    '</video>'
                var that = it;


                RongIMClient.init("pgyu6atqpnklu");

                it.createChatRoom(chatRoomId, function () {
                    that.joinChat(chatRoomId);
                    that.getComments(chatRoomId);
                    that.addReadNum(videoId);
                    that.getVistor(chatRoomId);
                })
                $.get('/app-sdk/broad/getActivity?broadId=' + videoId, function (res) {
                    if (res.code == 200 && res.data) {
                        that.act.actName = res.data.actName;
                        that.act.actDes = res.data.actDes;
                        that.act.beginTime = res.data.beginTime;
                        that.act.endTime = res.data.endTime;
                        that.act.actAddr = res.data.actAddr;
                    }
                })
                $.get('/app-sdk/broad/getPlan?broadId=' + videoId, function (res) {
                    if (res.code == 200 && res.data) {
                        that.plan.planContent = res.data.planContent;
                        that.plan.planRite = res.data.planRite;
                        that.plan.planTime = res.data.planTime;
                    }
                })
            });
        },
        createChatRoom: function (chatRoomId, callback) {
            var it = this;
            $.post('/app-msg/msg/getToken',
                { "name": this.userInfo.name, "userId": this.userInfo.id, "portraitUri": this.userInfo.url },
                function (res) {
                    if (res.code == 200) {
                        it.token = JSON.parse(res.data).token;
                        it.initCharRoom();
                    }
                }
            )
            $.get('/app-msg/chat/createChatroom?chatRoomIds=' + chatRoomId, function (res) {
                if (res.code == 200) {
                    callback && callback();
                }
            })
        },
        initCharRoom: function () {
            // 设置连接监听状态 （ status 标识当前连接状态）
            // 连接状态监听器
            RongIMClient.setConnectionStatusListener({
                onChanged: function (status) {
                    switch (status) {
                        //链接成功
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log('链接成功');
                            // debugger;
                            RongIMClient.getInstance().getConversationList({
                                onSuccess: function (list) {
                                    console.log(list);
                                },
                                onError: function (error) {
                                    // do something...
                                }
                            }, null);
                            RongIMClient.getInstance().getHistoryMessages(RongIMLib.ConversationType.PRIVATE, 'xxx', null, 20, {
                                onSuccess: function (list, hasMsg) {
                                    // hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
                                    // list 为拉取到的历史消息列表
                                    console.log(list);
                                },
                                onError: function (error) {
                                    // APP未开启消息漫游或处理异常
                                    // throw new ERROR ......
                                }
                            });
                            break;
                        //正在链接
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log('正在链接');
                            break;
                        //重新链接
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log('断开连接');
                            break;
                        //其他设备登录
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log('其他设备登录');
                            break;
                        //网络不可用
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log('网络不可用');
                            break;
                    }
                }
            });

            // 消息监听器
            RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function (message) {
                    // 判断消息类型
                    switch (message.messageType) {
                        case RongIMClient.MessageType.TextMessage:
                            // 发送的消息内容将会被打印
                            console.log(message.content.content);
                            break;
                        case RongIMClient.MessageType.VoiceMessage:
                            // 对声音进行预加载                
                            // message.content.content 格式为 AMR 格式的 base64 码
                            RongIMLib.RongIMVoice.preLoaded(message.content.content);
                            break;
                        case RongIMClient.MessageType.ImageMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.LocationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.RichContentMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.InformationNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ContactNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ProfileNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.UnknownMessage:
                            // do something...
                            break;
                        default:
                        // 自定义消息
                        // do something...
                    }
                }
            });
            RongIMClient.connect(this.token, {
                onSuccess: function (userId) {
                    console.log("Login successfully." + userId);
                },
                onTokenIncorrect: function () {
                    console.log('token无效');
                },
                onError: function (errorCode) {
                    debugger;
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                    }
                    console.log(errorCode);
                }
            });
        },
        getComments: function (chatRoomId) {
            var it = this;
            $.post('/app-msg/msg/queryChatroom', { chatroomId: chatRoomId }, function (res) {
                console.log(res);
                it.comments = res.data;
                if (it.isShowDanmu) {
                    for (var item of res.data) {
                        var content = item.content;
                        it.danmu(content);
                        setTimeout(function () {
                            it.getComments();
                        }, 100);
                    }
                }
            });
        },
        joinChat: function (chatRoomId) {
            var it = this;
            $.post('/app-msg/chat/joinChat', { chatroomId: chatRoomId, userIds: 1 }, function (res) {
                console.log(res);
            });
        },
        getVistor: function (chatRoomId) {
            var it = this;
            $.post('/app-msg/chat/queryChatUsers', { chatroomId: chatRoomId, count: '0', order: 1 }, function (res) {
                if (res.code = 200) {
                    var data = JSON.parse(res.data);
                    it.watchCount = data.total;
                }
            });

            function addZero(str) {
                if (str.length === 1) {
                    str = '0' + str;
                }
                return str;
            }

            var now = new Date();
            var nowStr = now.getFullYear().toString() + addZero((now.getMonth() + 1).toString()) + addZero(now.getDate().toString()) + addZero((now.getHours()).toString());

            $.get('/app-msg/chat/queryMsg?date=' + nowStr, function (res) {
                if (res.code = 200) {
                    it.msgCount = res.total;
                }
            })
        },
        addReadNum: function (videoId) {
            var it = this;
            // $.post('/app-server/video/addOneReadNum', {videoId: videoId},function (res) {
            //     console.log(res);
            // });
        },
        addComment: function (chatRoomId) {
            var it = this;
            var commentVideo = it.$el.querySelector('input[name="commentVideo"]').value;
            if (!commentVideo) {
                eventHub.$emit('showError', { msg: '内容不能为空' });
                return;
            }
            // 定义消息类型,文字消息使用 RongIMLib.TextMessage
            var msg = new RongIMLib.TextMessage({ content: commentVideo, extra: this.userInfo });
            //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
            //var msg = RongIMLib.TextMessage.obtain("hello");
            var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
            var targetId = "xxx"; // 目标 Id
            RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log("Send successfully");
                },
                onError: function (errorCode, message) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default:
                            info = x;
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            }
            );
        },
        onTab: function (tab) {
            this.tab = tab;
        },
        play: function () {
            var video = document.getElementById("video");
            if (!video.paused) {
                video.pause();
            } else {
                video.play();
            }
        },
        toPay: function (id) {
            this.$router.push('pay');
        },
        showDanmu: function () {
            var it = this;
            clearInterval(si);
            if (!it.isShowDanmu) {
                it.isShowDanmu = true;
                it.$el.querySelector('.danmuDiv').style.backgroundColor = "#2b52b2";
            } else {
                it.isShowDanmu = false;
                it.$el.querySelector('.danmuDiv').style.backgroundColor = "#d0d6dd";
            }
        },
        danmu: function (text = "或的方法反反复复凤飞飞") {
            var it = this;
            clearInterval(si);
            var videoDiv = document.getElementById("videoDiv");
            var textStyle = '<font id="textStyle" style="width:200px;">' + text + '</font>';
            console.log(videoDiv.offsetHeight)
            var mathHeight = Math.round(Math.random() * videoDiv.offsetHeight) + "px";
            var textLeft = videoDiv.offsetWidth + "px";
            videoDiv.innerHTML = textStyle;
            var textStyleObj = document.getElementById("textStyle");
            textStyleObj.style.left = textLeft;
            textStyleObj.style.top = mathHeight;
            var x = parseInt(textStyleObj.style.left);
            si = setInterval(function () {
                it.xuanhuan(x);
            }, 100);
        },
        xuanhuan: function (left) {
            var textStyleObj = document.getElementById("textStyle");
            textStyleObj.style.left = left;
            var x = parseInt(textStyleObj.style.left);
            if (x < textStyleObj.style.width) {
                document.getElementById("videoDiv").innerHTML = "";
                clearInterval(si);
            } else {
                x -= 18;
            }
            textStyleObj.style.left = x + "px";
        }
    }
};

