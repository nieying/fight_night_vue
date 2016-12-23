<template>
    <div class="pic-ctn">
        <section class="phone-ctn">
            <h4 class="phone-title">证件照</h4>
            <div v-show="pic.img1" class="pic-ctn">
                <div class="pic-item">
                    <img class="pic-item_img" v-bind:src="pic.img1" alt="">
                    <a class="pic-item_close" @click="deletePic('img1')">✖</a>
                </div>
            </div>
            <div v-show="!pic.img1" class="phone-choose" onclick="document.getElementById('imginputfile').click()" @click="chooseImg('img1',$event)">
                ＋
            </div>
            <div class="phone-tip">注:请上传证件的个人照片</div>
        </section>

        <section class="phone-ctn">
            <div style="float: left;">
                <h4 class="phone-title">上身照</h4>
                <div v-show="pic.img2" class="pic-ctn">
                    <div class="pic-item">
                        <img class="pic-item_img" v-bind:src="pic.img2" alt="">
                        <a class="pic-item_close" @click="deletePic('img2')">✖</a>
                    </div>
                </div>
                <div v-show="!pic.img2" class="phone-choose" onclick="document.getElementById('imginputfile').click()" @click="chooseImg('img2',1)">
                    ＋
                </div>
            </div>
            <div style="float: left;margin-left:60px;">
                <h4 class="phone-title">全身照</h4>
                <div v-show="pic.img3" class="pic-ctn">
                    <div class="pic-item">
                        <img class="pic-item_img" v-bind:src="pic.img3" alt="">
                        <a class="pic-item_close" @click="deletePic('img3')">✖</a>
                    </div>
                </div>
                <div v-show="!pic.img3" class="phone-choose" onclick="document.getElementById('imginputfile').click()" @click="chooseImg('img3',1)">
                    ＋
                </div>
            </div>
            <div class="phone-tip" style="clear:left;padding-left: 24px;"><span style="position:absolute;margin-left:-24px;">注:</span>上身照:男选手穿四角裤，显示出全身肌肉，无首饰<br>全身照:男选手上身赤裸，显示出肌肉，无首饰</div>
        </section>
        <section class="phone-ctn muti-ctn">
            <h4 class="phone-title">证件照片</h4>
            <div v-for="(value,index) in pic.img4" class="pic-ctn">
                <div class="pic-item">
                    <img class="pic-item_img" v-bind:src="value" alt="">
                    <a class="pic-item_close" @click="deletePic('img4',index)">✖</a>
                </div>
            </div>
            <div class="phone-choose" onclick="document.getElementById('imginputfileMutil').click()" @click="chooseMutilImg('img4',-1)">
                ＋
            </div>
            <div class="phone-tip">注:请上传证件照片清晰的正面照和反面照</div>
        </section>
        <input type="file" id="imginputfile" accept="image/*" style="display:none;" v-on:change="fileChange($event)">
        <input type="file" id="imginputfileMutil" accept="image/*" style="display:none;" multiple="multiple" v-on:change="fileChange($event)">
        <section class="form_box-btn">
            <a class="btn-primary" type="button" v-once @click="nextStep()">{{this.$route.query.href?'完成':'提交'}}</a>
        </section>
    </div>
</template>
<script>
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';
	import { mapGetters } from 'vuex';
	import * as types from 'src/vuex/mutation-types';

    export default{
        created: function() {
            tool.setPageTitle('上传图片');
		},
        mounted:function() {
			
		},
        data(){
            return{
                currentObj:''
            }
        },
        computed:{
			...mapGetters({
				pic:'playerPicInfo'
			})
        },
        methods:{       
            deletePic:function(name,index){
                if(typeof index !=='undefined'){
                    let length = this.pic[name].length;
                    let newList=[];
                    for(var i=0;i<length;i++){
                        if(i!==index){
                            newList.push(this.pic[name][i]);
                        }
                    }
                    this.pic[name]=newList;
                }else{
                    this.pic[name]='';
                }
            },
            fileChange:function(event){
                window.URL = window.URL || window.webkitURL
                var select = event.target;
                var sUserAgent = navigator.userAgent.toLowerCase()
                var selectedFiles = select.files;
                for(var i=0;i< selectedFiles.length;i++){                        
                    // 判断文件类型是否为图片
                    var selectedFile= selectedFiles[i];
                    var imageType = /image.*/
                    if (!selectedFile.type.match(imageType)) {
                        return false
                    }

                    let reader = new window.FileReader()
                    var _this = this;
                    reader.onload = function (e) {
                        let result = e.target.result;

                        var img = new Image();
                        img.src = result;

                        // 图片加载完毕之后进行压缩，然后上传
                        if (img.complete) {
                            callback();
                        } else {
                            img.onload = callback;
                        }

                        function callback() {
                            var data = tool.compress(img);
                            if(_this.currentObj==='img4'){
                                _this.pic[_this.currentObj].push(data);
                            }else{
                                _this.pic[_this.currentObj] = data;
                            }
                            img = null;
                        }
                    }                
                    reader.readAsDataURL(selectedFile);
                    
                }
            },
            chooseImg:function(name,event){
                this.currentObj = name;
                if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
                    let select = document.getElementById('imginputfile');
                    select.click();
	            } 
            },  
            chooseMutilImg:function(name,event){
                this.currentObj = name;                
                if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
                    let select = document.getElementById('imginputfileMutil')
                    select.click();        
                }        
            },
            nextStep: function() {
                this.$store.commit(types.PLAYER_SAVE_PIC,this.pic);
                if(this.$route.query&&this.$route.query.href){
					this.$router.go(-1);
				}else{
					this.$router.push('other')
				}
            }
        }
    }
</script>
<style>
    .pic-ctn {
        /*background-image: url('../../asset/bg_info.png');   
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: 100%;*/
    }
    
	.pic-ctn:before {
		content: ' ';
		position: fixed;
		z-index: -1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url('../../asset/bg_info.png') center 0 no-repeat;
		background-size: 100%;
	}
    
    .pic-item {
        width: 85px;
        height: 85px;
        margin: 0 0 10px 0;
        text-align: right;
    }
    
    img.pic-item_img {
        width: 100%;
        height: 100%;
        display: block;
        border: 1px solid #505050;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    a.pic-item_close {
        position: absolute;
        width: 24px;
        height: 24px;
        margin-top: -85px;
        margin-left: -24px;
        color: #fff;
        text-align: center;
        line-height: 24px;
        font-size: 16px;
    }
    
    .muti-ctn {
        overflow: hidden;
    }
    
    .muti-ctn .pic-ctn,
    .muti-ctn .phone-choose {
        float: left;
        margin-right: 10px;
    }
</style>