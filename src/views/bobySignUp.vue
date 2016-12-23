<template>
	<div class="container baby-ctn">
		<div class="form_box">
			<section class="form_box--item">
				<label class="form_box--head">姓名</label>
				<input v-model.trim="baby.babyName" v-input class="form_box--field form_box--input" placewhileImger="请输入姓名" type="text" autocomplete="off"
					name="babyName" required>
			</section>
			<section class="form_box--item">
				<label class="form_box--head">出生年月</label>
				<input v-model.trim="baby.birth" v-birth-input v-input class="form_box--field form_box--input" type="date" autocomplete="off"
					name="birth">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">身高(cm)</label>
				<input v-model.trim.number="baby.height" v-input class="form_box--field form_box--input" type="number" autocomplete="off"
					required name="height">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">体重(kg)</label>
				<input v-model.trim.number="baby.weight" v-input class="form_box--field form_box--input" type="number" autocomplete="off"
					required name="weight">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">胸围(cm)</label>
				<input v-model.trim.number="baby.chest" v-input class="form_box--field form_box--input" type="number" autocomplete="off"
					required name="chest">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">臀围(cm)</label>
				<input v-model.trim.number="baby.bicep" v-input class="form_box--field form_box--input" type="number" autocomplete="off"
					required name="bicep">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">腰围(cm)</label>
				<input v-model.trim.number="baby.waist" v-input class="form_box--field form_box--input" type="number" autocomplete="off"
					required name="waist">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">手机号码</label>
				<input v-model.trim.number="baby.mobile" v-input class="form_box--field form_box--input" type="number" autocomplete="off"
					required name="mobile" maxlength="11">
			</section>
			<section class="form_box--item">
				<label class="form_box--head">家庭住址</label>
				<textarea v-model.trim="baby.addr" v-input class="form_box--field form_box--input" type="text" autocomplete="off" name="addr"></textarea>
				<!--<input v-model.trim="baby.addr" v-input class="form_box--field form_box--input" type="text" autocomplete="off" required
					name="addr">-->
			</section>

			<section class="bady-phone-ctn">
				<div class="baby-phone-item">
					<h4 class="phone-title">上身照</h4>
					<div v-show="halfImg" class="pic-ctn">
						<div class="pic-item">
							<img class="pic-item_img" v-bind:src="halfImg" alt="">
							<a class="pic-item_close" @click="deletePic('halfImg')">✖</a>
						</div>
					</div>
					<div v-show="!halfImg" class="phone-choose" onclick="document.getElementById('imginputfile').click()" @click="chooseImg('halfImg',$event)">
						＋
					</div>
				</div>
				<div class="baby-phone-item">
					<h4 class="phone-title">全身照</h4>
					<div v-show="whileImg" class="pic-ctn">
						<div class="pic-item">
							<img class="pic-item_img" v-bind:src="whileImg" alt="">
							<a class="pic-item_close" @click="deletePic('whileImg')">✖</a>
						</div>
					</div>
					<div v-show="!whileImg" class="phone-choose" onclick="document.getElementById('imginputfile').click()" @click="chooseImg('whileImg',$event)">
						＋
					</div>
				</div>
				<div class="phone-tip">
					<span style="position:absolute;margin-left:-24px;">注：</span> 1、只接受女宝贝. 2、请宝贝完善本界面所有内容，并上传露出五官的全身照、半身照各一张。
				</div>
				<input type="file" id="imginputfile" accept="image/*" style="display:none;" v-on:change="fileChange($event)">
			</section>
			<section class="input-verify-ctn" style="margin-left:14px;">
				验证码: <input v-model.trim="veriryCode" class="input-verify-input" type="text"><img class="input-verify-img" src="/app-server/app/captcha"
					alt="验证码" onclick="this.src='/app-server/app/captcha'">
			</section>
			<section class="form_box-btn">
				<input class="btn-primary" v-on:click="nextStep()" type="button" value="提交">
			</section>
			<!--<section class="form_box-btn">
				<input class="btn-primary" v-on:click="nextStep2()" type="button" value="提交2">
			</section>-->
		</div>
	</div>
</template>

<script>
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';

    export default{
        created: function() {
            tool.setPageTitle('宝贝报名');
        },
        mounted:function() {
			// eventHub.$emit('showError',{msg:'hha'});
		},
        data(){
            return {
                baby: {
					babyName:'',
					birth:'',
					height:'',
					weight:'',
					chest:'',
					bicep:'',
					waist:'',
					mobile:'',
					addr:'',
					halfImg:'',
					whileImg:'',
					code:''
                },
				veriryCode:'',
				halfImg:'',
				whileImg:'',
				imgUploadCount:0,
				busy:false
            }
        },
        watch: {
            bady: {
                handler: function(val, oldVal) {
                },
                deep: true
            },
        },
        computed: {
        },
        methods: {
            deletePic:function(name,index){
				this[name]='';
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
							_this[_this.currentObj] = data;
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
			checkValid:function(){
				var result  =true;
				var el = null;
				debugger;
				if(!this.baby.babyName){
					eventHub.$emit('showError',{msg:'姓名不能为空'});
					el = this.$el.querySelector('input[name="name"]');
					result=false;
                }else if(this.baby.babyName.toString().length>20){
					eventHub.$emit('showError',{msg:'姓名不能超过20个字符'});
					el = document.querySelector('input[name="babyName"]');
					result=false;
				} else if(!this.baby.birth){
					eventHub.$emit('showError',{msg:'出生年月不能为空'});
					el = this.$el.querySelector('input[name="birth"]');
					result=false;
                }else if(!this.baby.height){
					eventHub.$emit('showError',{msg:'身高不能为空'});
					el = this.$el.querySelector('input[name="height"]');
					result=false;
                }else if(!this.baby.height.toString().length>10){
					eventHub.$emit('showError',{msg:'身高格式不正确'});
					el = this.$el.querySelector('input[name="height"]');
					result=false;
                }else if(!this.baby.weight){
					eventHub.$emit('showError',{msg:'体重不能为空'});
					el = this.$el.querySelector('input[name="weight"]');
					result=false;
                }else if(!this.baby.weight.toString().length>10){
					eventHub.$emit('showError',{msg:'体重格式不正确'});
					el = this.$el.querySelector('input[name="weight"]');
					result=false;
                }else if (!this.baby.chest){
					el = this.$el.querySelector('input[name="chest"]');
					eventHub.$emit('showError',{msg:'胸围不能为空'})
					result = false;
				}else if (!this.baby.chest.toString().length>10){
					el = this.$el.querySelector('input[name="chest"]');
					eventHub.$emit('showError',{msg:'胸围格式不正确'})
					result = false;
				}else if (!this.baby.bicep){
					el = this.$el.querySelector('input[name="bicep"]');
					eventHub.$emit('showError',{msg:'臀围不能为空'})
					result = false;
				}else if (!this.baby.bicep.toString().length>10){
					el = this.$el.querySelector('input[name="bicep"]');
					eventHub.$emit('showError',{msg:'臀围格式不正确'})
					result = false;
				}else if (!this.baby.waist){
					el = this.$el.querySelector('input[name="waist"]');
					eventHub.$emit('showError',{msg:'腰围不能为空'})
					result = false;
				}else if (!this.baby.waist.toString().length>10){
					el = this.$el.querySelector('input[name="waist"]');
					eventHub.$emit('showError',{msg:'腰围格式不正确'})
					result = false;
				}else if (!this.baby.mobile){
					el = this.$el.querySelector('input[name="mobile"]');
					eventHub.$emit('showError',{msg:'手机号不能为空'})
					result = false;
				}else if (!/^(1)[0-9]{10}$/.test(this.baby.mobile)){
					el = document.querySelector('input[name="mobile"]');
					eventHub.$emit('showError',{msg:'手机号格式不正确'})
					result = false;
				}else if (!this.baby.addr){
					el = this.$el.querySelector('textarea[name="addr"]');
					eventHub.$emit('showError',{msg:'家庭地址不能为空'})
					result = false;
				}else if (!this.baby.addr.toString().length>50){
					el = this.$el.querySelector('input[name="addr"]');
					eventHub.$emit('showError',{msg:'家庭地址格式不正确'})
					result = false;
				}else if(!this.halfImg){
					eventHub.$emit('showError',{msg:'上身照不能为空'})
					result = false;
				}else if(!this.whileImg){
					eventHub.$emit('showError',{msg:'全身照不能为空'})
					result = false;
				}

				if(el){
					el.scrollIntoView();
					el.classList.add('error');
				}
                return result;
			},
			postForm:function(){
				this.baby.code = this.veriryCode;
				var self =this;
				eventHub.$emit('loading');
				$.post('/app-server/baby/saveBabyInfo',this.baby,
					function(res) {
                    	if(res.code==200){
							self.$router.push('/success');
						}
					}
				)
			},
            nextStep: function() {
				if(!this.checkValid()){
					return;
				}
				if(!this.veriryCode){
					eventHub.$emit('showError',{msg:'请输入验证码'});
					return;
				}

				// if(this.busy){
				// 	return;
				// }
				this.busy=true;

				// this.postForm();
				var self= this;
				var evh = eventHub;
				eventHub.$emit('loading');

				$.post('/app-server/app/uploadImg',{halfImg:this.halfImg.split(',')[1]},
					function(res){
						var data = res.data;
						evh.$emit('loading');

						self.baby['halfImg'] =data.value[0];
						var that = self;
						var ev = evh;
						$.post('/app-server/app/uploadImg',{whileImg:self.whileImg.split(',')[1]},
							function(res1){
								var data1 = res1.data;
								that.baby['whileImg'] =data1.value[0];
								that.postForm();
							}
						)
					});
            }
        }
    }
</script>
<style>
	.baby-ctn {
		/*background-image: url('../asset/bg_baby.png');*/
		/*background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: 100%;*/
	}
	
	.baby-ctn:before {
		content: ' ';
		position: fixed;
		z-index: -1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url('../asset/bg_baby.png') center 0 no-repeat;
		background-size: 100%;
	}
	
	.bady-phone-ctn {
		margin-top: 40px;
	}
	
	.baby-phone-item {
		float: left;
		width: 50%;
		text-align: center;
	}
	
	.baby-phone-item .phone-title {
		width: 100%;
		color: #9a9a9a;
	}
	
	.baby-phone-item .phone-choose {
		margin: 0 auto 10px;
	}
	
	.bady-phone-ctn .phone-tip {
		clear: left;
		font-size: 12px;
		padding-left: 48px;
	}
	
	.pic-item {
		width: 85px;
		height: 85px;
		margin: 0 auto 10px;
		text-align: right;
	}
	
	.pic-item_close {
		position: absolute;
		width: 24px;
		height: 24px;
		margin-top: -92px;
		margin-left: -24px;
		color: #fff;
		text-align: center;
		line-height: 24px;
		font-size: 16px;
	}
	
	.pic-item img {
		width: 100%;
		height: 100%;
	}
</style>