<template>

    <div class="container">
        <div class="form_box">
            <section class="form_box--item">
                <!--<label class="form_box--head">手机号码</label>-->
                <input v-model.trim="mobile" v-input class="form_box--field form_box--input" placeholder="请输入手机号" type="mobile" autocomplete="off"
                    name="mobile" required maxlength="11">
            </section>
            <section class="form_box--item code">
                <!--<label class="form_box--head">手机验证码</label>-->
                <input v-model.trim="mobileCode" v-input class="form_box--field form_box--input" placeholder="请输入验证码" type="text" autocomplete="off"
                    name="mobileCode">
                <input class="form-box--item_btn" @click.prevent="sendCode()" type="button" :value="codeTxt" :disabled="!codeBtnEnable">
            </section>
            <!--<section class="form_box--item">
                <label class="form_box--head">密码</label>
                <input v-model.trim.number="pwd" v-input class="form_box--field form_box--input" placeholder="请输入密码" type="text" autocomplete="off"
                    required name="pwd">
            </section>-->
            <section class="form_box-btn">
                <input class="btn-primary" v-on:click="register()" type="button" value="完成">
            </section>
        </div>

        <div class="error-tip-ctn" style="display:none;">
            <p class="error-tip">页面打开出错了<span>{{msg}}</span></p>
        </div>
    </div>
</template>
<script>
    
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';

    export default{
        created: function(){
            tool.setPageTitle('注册');
        },
        data:function(){
            return {
                mobile:'',
                mobileCode:'',
                pwd:'',
                codeTxt:'获取验证码',
                codeBtnEnable:true
            }
        },
        methods:{ 
            checkMobile:function(){
				var result  =true;
                var msg='';
                
				if(!this.mobile){
					msg='手机号不能为空';
                    result=false;
                }else if (!/^(1)[0-9]{10}$/.test(this.mobile)){
					msg='手机号格式不正确';
                    result=false;
                }
                if(msg){
                    $(".error-tip-ctn").show();
                    $('.error-tip-ctn').find('.error-tip').text(msg);
                    setTimeout(function(){
                        $(".error-tip-ctn").hide();
                    },3000)
                }
                return result;
            },
            sendCode:function(){
                if(!this.checkMobile()){
                    return;
                }
                this.codeBtnEnable = false;
                $.post('/app-server/sendRegCode',{mobile:this.phone},
                    function(res){
                        if(res.code==200){
                            var count = 60;
                            var timer=null;
                            this.codeTxt=60+'s';
                            var self =this;
                            timer = setInterval(function(){
                                --count;
                                if(count<=0){
                                    clearInterval(timer);
                                    self.codeBtnEnable = true;
                                }
                                self.codeTxt=count+'s';
                            },1000)
                        }else{
                            this.codeBtnEnable = true;
                        }
                    }
                )
            },
			checkValid:function(){
				var result =true;
				var el = null;
                var msg='';
                if(!this.checkMobile()){
					el = document.querySelector('input[name="mobile"]');
                    result=false;
                }else if(!this.mobileCode){
                    
					msg='验证码不能为空'
					el = document.querySelector('input[name="mobileCode"]');
					result=false;					
				} else if(!this.pwd){
					msg='密码不能为空'
					el = this.$el.querySelector('input[name="pwd"]');
					result=false;
                }

				if(el){
					el.scrollIntoView();
					el.classList.add('error');
				}
                if(msg){
                    $(".error-tip-ctn").show();
                    $('.error-tip-ctn').find('.error-tip').text(msg);
                    setTimeout(function(){
                        $(".error-tip-ctn").hide();
                    },3000)
                }
                return result; 
			},
            register: function() {	
				if(!this.checkValid()){
					return;
				}
                $.post('app-server/register',{mobile:this.mobile,code:this.mobileCode,pwd:this.pwd},
                    function(res){
                        if(res.code==200){
                            
                            $(".error-tip-ctn").show();
                            $('.error-tip-ctn').find('.error-tip').text('注册成功');
                            // eventHub.$emit('showError',{msg:'注册成功'});
                        }
                    }
                );

            }
        }
    }
</script>
<style>
    input.form-box--item_btn {
        position: absolute;
        right: 36px;
        width: 70px;
        height: 24px;
        margin-top: -28px;
        color: #fff;
        border: none;
        background: #2b51b2;
    }
    
    input.form-box--item_btn:disabled {
        background-color: #9c9c9c;
    }
    
    .form_box {
        padding-top: 86px;
    }
    
    section.form_box--item {
        padding: 20px 58px 0 58px;
    }
    
    input.form_box--field.form_box--input {
        width: 100%;
        display: block;
        margin: 0;
        left: 0;
        padding-bottom: 15px;
        height: 40px;
        font-size: 15px;
        margin-bottom: 52px;
    }
    
    .code input.form-box--item_btn {
        background: transparent;
        width: 106px;
        right: 56px;
        margin-top: -92px;
    }
    
    input.btn-primary {
        border-radius: 20px;
        font-size: 18px;
    }
    
    p.error-tip {
        border-radius: 20px;
        font-size: 18px;
        width: 100%;
        text-align: center;
        height: 44px;
        color: #000;
        background-color: #9a9a9a;
        line-height: 44px;
    }
    
    .error-tip-ctn {
        position: absolute;
        top: 30%;
        padding: 0 15px;
        width: 100%;
        box-sizing: border-box;
    }
</style>