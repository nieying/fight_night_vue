<template>
	<div class="form_box info_form">
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>姓名</label>
			<input v-model.trim="baseInfo.playerName" v-input class="form_box--field form_box--input" placeholder="请输入姓名" type="text"
				autocomplete="off" name="playerName" required>
		</section>
		<section class="form_box--item">
			<label class="form_box--head">性别</label>
			<div class="form_box--field">
				<div style="float:left;width:50%;margin-left:15px;">
					<div class="radioInput">
						<input v-model.trim="baseInfo.sex" type="radio" value="1" name="sex" id="maleRadio">
						<label for="maleRadio" class="radio-box"></label>
					</div>
					<label for="maleRadio">&nbsp;&nbsp;男</label>
				</div>
				<div style="float:left;">
					<div class="radioInput">
						<input v-model.trim="baseInfo.sex" type="radio" value="2" name="sex" id="femaleRadio">
						<label for="femaleRadio" class="radio-box"></label>
					</div>
					<label for="femaleRadio">&nbsp;&nbsp;女</label>
				</div>
			</div>
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>出生年月日</label>
			<input style="position:reavtive;bottom:4px;" v-date-input v-input v-birth-input v-model.trim="baseInfo.birth" class="form_box--field form_box--input" type="date" autocomplete="off"
				name="birth" required>
		</section>
		<section class="form_box_dis"></section>
		<section class="form_box--item">
			<label class="form_box--head">出生地</label>
			<textarea v-model.trim="baseInfo.birthPlace" class="form_box--field form_box--input" type="text" autocomplete="off" name="birthPlace"></textarea>
		</section>
		<section class="form_box--item">
			<label class="form_box--head">国籍</label>
			<input v-model.trim="baseInfo.country" class="form_box--field form_box--input" type="text" autocomplete="off" name="country">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">民族</label>
			<input v-model.trim="baseInfo.nation" class="form_box--field form_box--input" type="text" autocomplete="off" name="nation">
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>体重(kg)</label>
			<input v-kg-input v-input v-model.trim.number="baseInfo.weight" class="form_box--field form_box--input" type="number" autocomplete="off"
				name="weight">
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>身高(cm)</label>
			<input v-cm-input v-input v-model.trim.number="baseInfo.height" class="form_box--field form_box--input" type="number" autocomplete="off"
				name="height">
		</section>
		<section class="form_box_dis"></section>
		<section class="form_box--item">
			<label class="form_box--head">护照姓名</label>
			<input v-model.trim="baseInfo.passportName" class="form_box--field form_box--input" type="text" autocomplete="off" name="passportName">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">护照号码</label>
			<input v-model.trim="baseInfo.passportId" class="form_box--field form_box--input" type="text" autocomplete="off" name="passportId">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">护照有效期</label>
			<div class="form_box--field">
				<span class="gray_txt">(起)</span>
				<input style="position:reavtive;bottom:4px;margin-right:8px;width:80%;float:right" v-model.trim="baseInfo.passportTerm1" class="form_box--input_l input-left" type="date" autocomplete="off" name="passportTerm1">
				<!--<span class="gray_txt input-middle">至</span>-->
			</div>
		</section>
		<section class="form_box--item">
			<div class="form_box--field">
				<span class="gray_txt">(止)</span>
				<input style="position:reavtive;bottom:4px;margin-right:8px;width:80%;float:right" v-model.trim="baseInfo.passportTerm2" class="form_box--input_l input-right" type="date" autocomplete="off" name="passportTerm2">
			</div>
		</section>
		<section class="form_box--item">
			<label class="form_box--head">护照签发地</label>
			<textarea v-model.trim="baseInfo.passportAddr" class="form_box--field form_box--input" type="text" autocomplete="off" name="passportAddr"></textarea>
		</section>
		<section class="form_box_dis"></section>
		<section class="form_box--item">
			<label class="form_box--head">证件类型</label>
			<input v-model.trim="baseInfo.visaType" class="form_box--field form_box--input" type="text" autocomplete="off" name="visaType">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">证件类别</label>
			<input v-model.trim="baseInfo.visaCategory" class="form_box--field form_box--input" type="text" autocomplete="off" name="visaCategory">
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>证件号码</label>
			<input v-model.trim="baseInfo.visaId" class="form_box--field form_box--input" type="text" autocomplete="off" name="visaId">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">证件有效期</label>
			<div class="form_box--field">
				<span class="gray_txt">(起)</span>
				<input style="position:reavtive;bottom:4px;margin-right:8px;float:right;width:80%" v-model.trim="baseInfo.visaTerm1" class="form_box--input_l input-left" type="date" autocomplete="off" name="visaTerm1">
			</div>
		</section>
		<section class="form_box--item">
			<div class="form_box--field">
				<span class="gray_txt">(止)</span>
				<input style="position:reavtive;bottom:4px;margin-right:8px;float:right;width:80%" v-model.trim="baseInfo.visaTerm2" class="form_box--input_l input-right" type="date" autocomplete="off" name="visaTerm2">
			</div>
		</section>
		<section class="form_box--item">
			<label class="form_box--head">停留期限</label>
			<input v-model.trim="baseInfo.deadline" class="form_box--field form_box--input" type="text" autocomplete="off" name="deadline">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">签发日期</label>
			<input style="position:reavtive;bottom:4px;" v-model.trim="baseInfo.visaDate" class="form_box--field form_box--input" type="date" autocomplete="off" name="visaDate">
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>手机号码</label>
			<input v-model.trim="baseInfo.mobile" v-input class="form_box--field form_box--input" type="tel"  maxlength="11" autocomplete="off" required
				name="mobile">
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>家庭住址</label>
			<textarea v-model.trim="baseInfo.addr" v-input class="form_box--field form_box--input" type="text" autocomplete="off" required
				name="addr"></textarea>
			<!--<input v-model.trim="baseInfo.addr" class="form_box--field form_box--input" type="text" autocomplete="off" >-->
		</section>
		<section class="form_box--item">
			<label class="form_box--head"><span class="red_txt">*</span>邮箱</label>
			<input v-model.trim="baseInfo.email" v-input class="form_box--field form_box--input" type="email" autocomplete="off" name="email">
		</section>
		<section class="form_box--item">
			<label class="form_box--head">邮编</label>
			<input v-model.trim="baseInfo.postcode" class="form_box--field form_box--input" type="number" autocomplete="off" name="postcode">
		</section>
		<section class="form_box-btn">
			<a class="btn-primary" type="button" v-once @click="nextStep()">{{this.$route.query.href?'完成':'下一步'}}</a>
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
			tool.setPageTitle('基本信息');
		},
        mounted:function() {
		},
        data(){
            return {
            }
        },
        watch: {
        },
        computed: {
			...mapGetters({
				baseInfo:'playerBaseInfo'
			})
        },
        methods: {
			checkValid:function(){
				var result  =true;
				var el = null;
				if(!this.baseInfo.playerName){
					// eventHub.$emit('showError',{msg:'姓名不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = document.querySelector('input[name="playerName"]');
					result=false;
				} else if(this.baseInfo.playerName.length>20){
					eventHub.$emit('showError',{msg:'姓名不能超过20个字符'});
					el = document.querySelector('input[name="playerName"]');
					result=false;
				} else if(!this.baseInfo.birth){
					el = document.querySelector('input[name="birth"]');
					// eventHub.$emit('showError',{msg:'出生年月日不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result=false;
				}else if (!this.baseInfo.weight){
					el = document.querySelector('input[name="weight"]');
					// eventHub.$emit('showError',{msg:'体重不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result=false;
				}else if (!this.baseInfo.height){
					el = document.querySelector('input[name="height"]');
					// eventHub.$emit('showError',{msg:'身高不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!this.baseInfo.visaId){
					el = document.querySelector('input[name="visaId"]');
					// eventHub.$emit('showError',{msg:'证件号码不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.baseInfo.visaId)){
					el = document.querySelector('input[name="visaId"]');
					// eventHub.$emit('showError',{msg:'身高不能为空'});
					eventHub.$emit('showError',{msg:'请输入合法身份证'});
					result = false;
				}else if (!this.baseInfo.mobile){
					el = document.querySelector('input[name="mobile"]');
					// eventHub.$emit('showError',{msg:'手机号码不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!/^(1)[0-9]{10}$/.test(this.baseInfo.mobile)){
					el = document.querySelector('input[name="mobile"]');
					eventHub.$emit('showError',{msg:'手机号码格式不正确'})
					result = false;
				}else if (!this.baseInfo.addr){
					el = document.querySelector('input[name="addr"]');
					// eventHub.$emit('showError',{msg:'家庭地址不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!this.baseInfo.email){
					el = document.querySelector('input[name="email"]');
					// eventHub.$emit('showError',{msg:'邮箱不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if(!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(this.baseInfo.email)){
					el = document.querySelector('input[name="email"]');
					eventHub.$emit('showError',{msg:'邮箱格式不正确'})
					result = false;
				} 
				if(el){
					el.scrollIntoView();
					el.classList.add('error');
				}
				if(result===false){
					eventHub.$emit('showError',{msg:'请完善必填信息'});
				}
				return result;
			},
            nextStep: function() {
				if(!this.checkValid()){
					return;
				}
				this.$store.commit(types.PLAYER_SAVE_BASE,this.baseInfo);
				if(this.$route.query&&this.$route.query.href){
					this.$router.go(-1);
				}else{
					this.$router.push('/playSignUp/agent')
				}
            }
        }
    }
</script>
<style>
	.form_box--head {
		width: 90px;
	}

	.form_box--item {
		padding-left: 100px;
		padding-right: 36px;
	}

	.gray_txt.input-middle {
		position: absolute;
		width: 16px;
		margin-left: -8px;
		text-align: center;
		margin-top: 2px;
	}

	.form_box--input_l {
		width: 50%;
		box-sizing: border-box;
		display: block;
		float: left;
		/*line-height: 24px;*/
		padding-bottom: 2px;
		text-align: center;
	}

	.input-right {
		padding-left: 10px;
	}

	.input-left {
		padding-right: 8px;
	}

	.info_form {
		/*background-image: url('../../asset/bg_info.png');    
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: 100%;*/
	}

	.info_form:before {
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
</style>
