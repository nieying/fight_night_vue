<template>
    <div class="form_box">
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>经纪人姓名</label>
            <input v-model.trim="agent.agentName" v-input class="form_box--field form_box--input" placeholder="请输入姓名" type="text" autocomplete="off"
                name="agentName">
        </section>
        <section class="form_box--item">
            <label class="form_box--head">性别</label>
            <div class="form_box--field">
                <div style="float:left;width:50%;margin-left:15px;">
                    <div class="radioInput">
                        <input v-model.trim="agent.sex" type="radio" value="1" name="sex" id="maleRadio">
                        <label for="maleRadio" class="radio-box"></label>
                    </div>
                    <label for="maleRadio">&nbsp;&nbsp;男</label>
                </div>
                <div style="float:left;">
                    <div class="radioInput">
                        <input v-model.trim="agent.sex" type="radio" value="2" name="sex" id="femaleRadio">
                        <label for="femaleRadio" class="radio-box"></label>
                    </div>
                    <label for="femaleRadio">&nbsp;&nbsp;女</label>
                </div>
            </div>
        </section>
        <section class="form_box--item">
            <label class="form_box--head">年龄</label>
            <input v-model.trim="agent.age" class="form_box--field form_box--input" type="number" autocomplete="off" name="age">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>公司名称</label>
            <input v-model.trim="agent.companyName" v-input class="form_box--field form_box--input" type="text" autocomplete="off" name="companyName">
        </section>
        <section class="form_box--item">
            <label class="form_box--head">公司地址</label>
            <input v-model.trim="agent.companyAddr" class="form_box--field form_box--input" type="text" autocomplete="off" name="companyAddr">
        </section>
        <section class="form_box--item">
            <label class="form_box--head">邮编</label>
            <input v-model.trim="agent.postcode" class="form_box--field form_box--input" type="number" autocomplete="off" name="postcode">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>手机</label>
            <input v-model.trim.number="agent.mobile" v-input class="form_box--field form_box--input" type="phone" autocomplete="off"
                name="mobile">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>邮箱</label>
            <input v-model.trim="agent.email" v-input class="form_box--field form_box--input" type="email" autocomplete="off" name="email">
        </section>
        <section class="form_box--item">
            <label class="form_box--head">签约日期</label>
            <input style="position:reavtive;bottom:4px;" v-model.trim="agent.signTime1" class="form_box--field form_box--input" type="date" autocomplete="off" name="signTime1">
        </section>
        <section class="form_box-btn">
            <a class="btn-primary" type="button" v-once @click="nextStep()">{{this.$route.query.href?'完成':'下一步'}}</a>
            <a v-show="!this.$route.query.href" class="btn-assist" type="button" v-once @click="jump()">跳过</a>
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
            tool.setPageTitle('经纪人信息');
        },
        mounted:function() {
            window.scrollTo(0,0)
		},
        data(){
            return{
            }
        },
        computed: {
			...mapGetters({
				agent:'playerAgentInfo'
			})
        },
        methods:{
			checkValid:function(){
				var result  =true;
				var el = null;

				if(!this.agent.agentName){
					// eventHub.$emit('showError',{msg:'经纪人姓名不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = this.$el.querySelector('input[name="agentName"]');
					result=false;
				}else if(!this.agent.companyName){
					el = this.$el.querySelector('input[name="companyName"]');
					// eventHub.$emit('showError',{msg:'公司名称不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result=false;
                }else if (!this.agent.mobile){
					el = this.$el.querySelector('input[name="mobile"]');
					// eventHub.$emit('showError',{msg:'手机号码不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!/^(1)[0-9]{10}$/.test(this.agent.mobile)){
					el = this.$el.querySelector('input[name="mobile"]');
					eventHub.$emit('showError',{msg:'手机号码格式不正确'})
					result = false;
				}else if (!this.agent.email){
					el = this.$el.querySelector('input[name="email"]');
					// eventHub.$emit('showError',{msg:'邮箱不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if(!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(this.agent.email)){
                    debugger;
					el = this.$el.querySelector('input[name="email"]');
					eventHub.$emit('showError',{msg:'邮箱格式不正确'})
					result = false;
				}
				if(el){
					el.scrollIntoView();
					el.classList.add('error');
				}
                return result;
            },
            nextStep: function() {
				if(!this.checkValid()){
					return;
				}
                this.$store.commit(types.PLAYER_SAVE_AGENT,this.agent);
				if(this.$route.query&&this.$route.query.href){
					this.$router.go(-1);
				}else{
					this.$router.push('record')
				}
            },
            jump:function(){
				if(this.$route.query&&this.$route.query.href){
					this.$router.go(-1);
				}else{
					this.$router.push('record')
				}
            }
        }
    }
</script>
