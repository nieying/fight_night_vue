<template>
    <div class="baby-bg">
        <section class="view-box">
            <h3 class="view-box--title">基本信息</h3>
            <a class="view-box--edit btn-editRecord" @click='navigatePage("base")'>编辑</a>
            <div class="view-box--ctn">
                <span class="view-box--key">姓名:</span>
                <span class="view-box-val">{{baseInfo.playerName}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">性别:</span>
                <span class="view-box-val">{{baseInfo.sex==='1'?'男':'女'}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">出生年月日:</span>
                <span class="view-box-val">{{baseInfo.birth}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.birthPlace">
                <span class="view-box--key">出生地:</span>
                <p class="view-box-val widthAble" >{{baseInfo.birthPlace}}</p>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.country">
                <span class="view-box--key">国籍:</span>
                <span class="view-box-val">{{baseInfo.country}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.nation">
                <span class="view-box--key">名族:</span>
                <span class="view-box-val">{{baseInfo.nation}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">体重(kg):</span>
                <span class="view-box-val">{{baseInfo.weight}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">身高(cm):</span>
                <span class="view-box-val">{{baseInfo.height}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.passportName">
                <span class="view-box--key">护照姓名:</span>
                <span class="view-box-val">{{baseInfo.passportName}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.passportId">
                <span class="view-box--key">护照号码:</span>
                <span class="view-box-val">{{baseInfo.passportId}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.passportTerm1">
                <span class="view-box--key">护照有效期:</span>
                <span class="view-box-val">{{baseInfo.passportTerm1}}至{{baseInfo.passportTerm2}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.passportAddr">
                <span class="view-box--key">护照签发地:</span>
                <p class="view-box-val widthAble">{{baseInfo.passportAddr}}</p>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.visaType">
                <span class="view-box--key">证件类型:</span>
                <span class="view-box-val">{{baseInfo.visaType}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.visaCategory">
                <span class="view-box--key">证件类别:</span>
                <span class="view-box-val">{{baseInfo.visaCategory}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.visaId">
                <span class="view-box--key">证件号码:</span>
                <span class="view-box-val">{{baseInfo.visaId}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.visaTerm1">
                <span class="view-box--key">证件有效期:</span>
                <span class="view-box-val">{{baseInfo.visaTerm1}}至{{baseInfo.visaTerm2}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.deadline">
                <span class="view-box--key">停留期限:</span>
                <span class="view-box-val">{{baseInfo.deadline}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.visaDate">
                <span class="view-box--key">签发日期:</span>
                <span class="view-box-val">{{baseInfo.visaDate}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">手机号码:</span>
                <span class="view-box-val">{{baseInfo.mobile}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">家庭住址:</span>
                <p class="view-box-val widthAble" >{{baseInfo.addr}}</p>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">邮箱:</span>
                <span class="view-box-val">{{baseInfo.email}}</span>
            </div>
            <div class="view-box--ctn" v-show="baseInfo.postcode">
                <span class="view-box--key">邮编:</span>
                <span class="view-box-val">{{baseInfo.postcode}}</span>
            </div>
        </section>
        <section class="view-box">
            <h3 class="view-box--title">经纪人信息</h3>
            <a class="view-box--edit btn-editRecord" @click='navigatePage("agent")'>编辑</a>
            <div class="view-box--ctn">
                <span class="view-box--key">经纪人姓名:</span>
                <span class="view-box-val">{{agent.agentName}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">性别:</span>
                <span class="view-box-val">{{agent.sex=='1'?'男':(agent.sex=='2'?'女':'')}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">年龄:</span>
                <span class="view-box-val">{{agent.age}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">公司名称:</span>
                <span class="view-box-val">{{agent.companyName}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">公司地址:</span>
                <p class="view-box-val widthAble">{{agent.companyAddr}}</p>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">邮编:</span>
                <span class="view-box-val">{{agent.postcode}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">手机:</span>
                <span class="view-box-val">{{agent.mobile}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">邮箱:</span>
                <span class="view-box-val">{{agent.email}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">签约时间:</span>
                <span class="view-box-val">{{agent.signTime1}}</span>
            </div>
        </section>
        <section class="view-box">
            <h3 class="view-box--title">近期成绩</h3>
            <a class="view-box--edit btn-editRecord" @click='navigatePage("record")'>编辑</a>
            <div class="view-box--ctn">
                <span class="view-box--key">获奖头衔:</span>
                <span class="view-box-val">{{record.honor}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">赛事总成绩:</span>
                <span class="view-box-val">{{record.win||0}}胜&nbsp;&nbsp;{{record.fail||0}}败&nbsp;&nbsp;{{record.deuce||0}}平&nbsp;&nbsp;{{record.ko||0}}KO</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">参赛年数:</span>
                <span class="view-box-val">{{record.macthTime}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">教练姓名:</span>
                <span class="view-box-val">{{record.coach}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">训练视频(链接):</span>
                <span class="view-box-val">{{record.drillVideo}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">参赛名称:</span>
                <span class="view-box-val" v-if="record.item[0]">{{record.item[0].matchName}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">对抗选手:</span>
                <span class="view-box-val" v-if="record.item[0]">{{record.item[0].opponent}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">参赛日期:</span>
                <span class="view-box-val" v-if="record.item[0]">{{record.item[0].matchDate}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">体重(kg):</span>
                <span class="view-box-val" v-if="record.item[0]">{{record.item[0].weight}}</span>
            </div>
            <div class="view-box--ctn">
                <span class="view-box--key">比赛结果:</span>
                <span class="view-box-val" v-if="record.item[0]">{{getResult(record.item[0].matchResult)}}</span>
            </div>
        </section>
        <section class="view-box">
            <h3 class="view-box--title">上传图片</h3>
            <a class="view-box--edit btn-editRecord" @click='navigatePage("pic")'>编辑</a>
            <div class="view-picline"></div>
            <div class="view-box--picitem">
                <div class="view-box-pictitle">
                    <span class="view-box-picname">证件照</span>
                    <span class="view-box-picdot"></span>
                </div>
                <div class="view-box-picitem">
                    <img v-bind:src="pic.img1" alt="">
                </div>
            </div>
            <div class="view-box--picitem">
                <div class="view-box-pictitle">
                    <span class="view-box-picname">上身照</span>
                    <span class="view-box-picdot"></span>
                </div>
                <div class="view-box-picitem">
                    <img v-bind:src="pic.img2" alt="">
                </div>
            </div>
            <div class="view-box--picitem">
                <div class="view-box-pictitle">
                    <span class="view-box-picname">全身照</span>
                    <span class="view-box-picdot"></span>
                </div>
                <div class="view-box-picitem">
                    <img v-bind:src="pic.img3" alt="">
                </div>
            </div>
            <div class="view-box--picitem">
                <div class="view-box-pictitle">
                    <span class="view-box-picname">证件照</span>
                    <span class="view-box-picdot"></span>
                </div>
                <div class="view-box-picitem mutil">
                    <img v-for='item in pic.img4' v-bind:src="item" alt="">
                </div>
            </div>
        </section>
        <section class="view-box">
            <h3 class="view-box--title">其他</h3>
            <a class="view-box--edit btn-editRecord" @click='navigatePage("other")'>编辑</a>
            <h3 class="assess-title">星级评价</h3>
            <section class="assess-star">
                拳击
                <div class="assess-star--ctn">
                    <div class="assess-star--item" v-bind:class="{active:this.other.boxing>0}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.boxing>1}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.boxing>2}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.boxing>3}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.boxing>4}"></div>
                </div>
            </section>
            <section class="assess-star">
                踢腿
                <div class="assess-star--ctn">
                    <div class="assess-star--item" v-bind:class="{active:this.other.kick>0}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.kick>1}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.kick>2}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.kick>3}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.kick>4}"></div>
                </div>
            </section>
            <section class="assess-star">
                速度
                <div class="assess-star--ctn">
                    <div class="assess-star--item" v-bind:class="{active:this.other.speed>0}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.speed>1}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.speed>2}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.speed>3}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.speed>4}"></div>
                </div>
            </section>
            <section class="assess-star">
                防御
                <div class="assess-star--ctn">
                    <div class="assess-star--item" v-bind:class="{active:this.other.defense>0}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.defense>1}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.defense>2}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.defense>3}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.defense>4}"></div>
                </div>
            </section>
            <section class="assess-star">
                力量
                <div class="assess-star--ctn">
                    <div class="assess-star--item" v-bind:class="{active:this.other.power>0}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.power>1}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.power>2}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.power>3}"></div>
                    <div class="assess-star--item" v-bind:class="{active:this.other.power>4}"></div>
                </div>
            </section>
            <section class="view-box-self">
                自我评价:{{other.selfRate}}
            </section>
            <section class="input-verify-ctn">
                验证码: <input v-model.trim="veriryCode" class="input-verify-input" type="text"><img class="input-verify-img"
                    src="/app-server/app/captcha" onclick="this.src='/app-server/app/captcha'" alt="验证码">
            </section>
        </section>
        <section class="view-submit">
            <a class="btn-primary" type="button" @click="submitForm()">提交</a>
        </section>
    </div>
</template>
<script>
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';
	import { mapGetters } from 'vuex'

    export default{
        created: function() {
            tool.setPageTitle('预览');
		},
        mounted:function() {
			
		},
        data(){
            return{
                veriryCode:'',
                picurl:{}
                
            }
        },
        computed:{            
			...mapGetters({
				baseInfo:'playerBaseInfo',
                agent:'playerAgentInfo',
                record:'playerRecordInfo',
                pic:'playerPicInfo',
                other:'playerOtherInfo'
			})
        },
        methods:{
            getResult:function(val){
                var res='';
                if(val==='1'){
                    res='胜';
                }if(val==='2'){
                    res='败';
                }else if(val==='3'){
                    res='平';
                }else if(val==='4'){
                    res='KO';
                }
                return res;
            },
            navigatePage:function(name){
                this.$router.push('/playSignUp/'+name+'?href=/playSignUp/view');
            },            
			postForm:function(){
                var selt =this;
				eventHub.$emit('loading');
                $.post('/app-server/player/insertPlayer',{
                    base:this.baseInfo,
                    agent:this.agent,
                    record:this.record,
                    pic:this.picurl,
                    other:this.other,
                    code:{code:this.veriryCode}
                },function(res){                    
                    if(res.code==200){
				        selt.$router.push('/success')
                    }
                })
			},
            uploadImg4:function(){
                var img4 = this.pic.img4;
                var imgUploadCount=0;
                var len = img4.length;
                if(len==0){                    
                    this.postForm();
                }
				for(var i = 0;i<len;i++){
					var body = {};
						body[i] = img4[i].split(',')[1];
					var self = this;
                    self.picurl.img4 = '';
					$.post('/app-server/app/uploadImg',body,
						function(res){
							if(res.code==200){
								imgUploadCount++;
								// eventHub.$emit('showError',{msg:'数据提交中，请等待'});
								if(self.picurl.img4===''){
                                    self.picurl.img4=res.data.value[0];
                                }else{                                    
                                    self.picurl.img4+=res.data.value[0];
                                }

								if(imgUploadCount >= img4.length){
									self.postForm();
								}
							}
						}
					)

				}
            },
            uploadImg1:function(callback){
                if(!this.pic.img1){
                    callback&&callback();
                }
				eventHub.$emit('loading');
                var self =this;
                $.post('/app-server/app/uploadImg',{img1:this.pic.img1.split(',')[1]},
                    function(res){
                        if(res.code==200){
                            self.picurl.img1 = res.data.value[0];
                        }
                        callback&&callback();
                    });
            },
            uploadImg2:function(callback){
                if(!this.pic.img2){
                    callback&&callback();
                }
				eventHub.$emit('loading');
                var self =this;
                $.post('/app-server/app/uploadImg',{img1:this.pic.img2.split(',')[1]},
                    function(res){
                        if(res.code==200){
                            self.picurl.img2 = res.data.value[0];
                        }
                        callback&&callback();
                    });
            },
            uploadImg3:function(callback){
                if(!this.pic.img3){
                    callback&&callback();
                }
				eventHub.$emit('loading');
                var self =this;
                $.post('/app-server/app/uploadImg',{img1:this.pic.img3.split(',')[1]},
                    function(res){
                        if(res.code==200){
                            self.picurl.img3 = res.data.value[0];
                        }
                        callback&&callback();
                    });
            },
			submitForm:function(){
				if(!this.veriryCode){
					eventHub.$emit('showError',{msg:'请输入验证码'});
					return;
				}
                // this.postForm();
                var self =this;
                this.uploadImg1(function(){
                    var it = self;
                    self.uploadImg2(function(){
                        var that = it;
                        it.uploadImg3(function(){
                            that.uploadImg4();
                        })
                    })
                })
			}
        }
    }
</script>
<style>
    .view-box {
        overflow: hidden;
        padding-left: 16px;
        margin-top: 20px;
        background-color: rgba(255, 255, 255, .1);
        position: relative;
    }
    
    .view-box--title {
        border-bottom: 1px solid #9a9a9a;
        margin: 0;
        padding: 10px 0;
    }
    
    .view-box--edit {
        margin-right: 14px;
        margin-top: -32px;
    }
    
    .view-box--ctn {
        overflow: hidden;
        line-height: 40px;
        color: #9a9a9a;
        font-size: 14px;
    }
    
    .view-box--key {
        position: absolute;
        width: 120px;
    }
    
    .view-box-val {
        margin-left: 130px;
        color: #fff;
    }
    
    .view-box--picitem {
        overflow: hidden;
        margin: 18px 0px;
    }
    
    .view-box-pictitle {
        float: left;
        height: 40px;
        line-height: 40px;
        padding-top: 28px;
        color: #9a9a9a;
        width: 111px;
    }
    
    .view-box-picitem {
        float: left;
        width: 170px;
        height: 115px;
        background-color: rgba(255, 255, 255, .2);
    }
    
    .view-box-picitem img {
        width: 100%;
        height: 100%;
    }
    
    .view-box-picdot {
        position: absolute;
        left: 76px;
        width: 18px;
        height: 18px;
        background-color: rgba(255, 255, 255, 0.3);
        margin-top: 12px;
        border-radius: 50%;
    }
    
    .view-box-picdot:after {
        content: '';
        width: 9px;
        height: 9px;
        display: block;
        position: absolute;
        background-color: #2b51b2;
        border-radius: 50%;
        margin-top: 5px;
        margin-left: 5px;
    }
    
    .view-picline {
        position: absolute;
        height: 393px;
        border-right: 1px solid #c9c9c9;
        left: 84px;
        opacity: 0.5;
        top: 120px;
    }
    
    .view-box-picitem.mutil {
        height: auto;
        background-color: transparent;
    }
    
    .view-box-picitem.mutil img {
        height: 115px;
        margin-bottom: 10px;
    }
    
    .view-box .assess-title,
    .view-box .assess-star {
        margin-left: 0;
    }
    
    .view-box-self {
        color: #9a9a9a;
        line-height: 20px;
        border-top: 1px solid #9a9a9a;
        padding: 10px 16px 20px 0;
        box-sizing: border-box;
        word-break: break-all;
    }
    
    .view-submit {
        margin: 16px 0 42px;
    }

    .widthAble{
        line-height: 20px;
        padding-top: 12px;
        padding-right: 4%;
        display:inline-block;
        }
</style>