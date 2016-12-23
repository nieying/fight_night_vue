<template>
    <div class="edit-bg">
        <section class="form_box--item">
            <label class="form_box--head">参赛名称</label>
            <input v-model.trim="tempRecord.matchName" class="form_box--field form_box--input" placeholder="" type="text" autocomplete="off"
                name="matchName">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>体重(kg)</label>
            <input v-model.trim="tempRecord.weight" v-input class="form_box--field form_box--input" placeholder="" type="number" autocomplete="off"
                name="weight">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>参赛日期</label>
            <input style="position:reavtive;bottom:4px;" v-model.trim="tempRecord.matchDate" v-input class="form_box--field form_box--input" placeholder="" type="date" autocomplete="off"
                name="matchDate">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>对抗选手</label>
            <input v-model.trim="tempRecord.opponent" v-input class="form_box--field form_box--input" placeholder="" type="text" autocomplete="off"
                name="opponent">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>比赛结果</label>
            <select class="form_box--field form_box--input" placeholder="---点击选择---" name="matchResult">
					<option value="1">胜</option>
					<option value="2">败</option>
					<option value="3">平手</option>
					<option value="4">KO</option>
            </select>
        </section>
        <section class="form_box-btn">
            <input class="btn-primary" v-on:click="editRecordFinsh()" type="button" value="完成">
        </section>
    </div>
</template>
<script>
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';
	import * as types from 'src/vuex/mutation-types';

    export default{
        created: function() {
            var item=null;
            var id =this.$route.params.id;
            if(id!=='new'){
                item = this.$store.getters.playerRecordInfo.item[id-1];
                tool.setPageTitle('编辑近期成绩');
            }else{
                tool.setPageTitle('添加近期成绩');
            }
            if(item){
                this.tempRecord = item;
            }
		},
        mounted:function() {

		},
        data(){
            return{
				tempRecord:{
                    id:'',
					matchName:'',
					weight:'',
					matchDate:'',
					opponent:'',
					matchResult:'1'
				}
            }
        },
        methods:{

			checkValid:function(){
				var result  =true;
				var el = null;
				if(!this.tempRecord.weight){
					// eventHub.$emit('showError',{msg:'体重不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = this.$el.querySelector('input[name="weight"]');
					result=false;
                }else if (!this.tempRecord.matchDate){
					el = this.$el.querySelector('input[name="matchDate"]');
					// eventHub.$emit('showError',{msg:'参赛日期不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!this.tempRecord.opponent){
					el = this.$el.querySelector('input[name="opponent"]');
					// eventHub.$emit('showError',{msg:'对抗选手不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				// }else if(!this.tempRecord.matchResult){
    //                 el = this.$el.querySelector('input[name="matchResult"]');
				// 	eventHub.$emit('showError',{msg:'请选择比赛结果'})
				// 	result = false;
                }
				if(el){
					el.scrollIntoView();
					el.classList.add('error');
				}
                return result;
            },
			editRecordFinsh:function(){
				if(!this.checkValid()){
					return;
				}
                this.$store.commit(types.PLAYER_SAVE_RECORDITEM,this.tempRecord);

                this.$router.go('-1');
			}
        }
    }
</script>
<style>
    .edit-bg {
        /*background-image: url('../../asset/bg_record.png');    
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: 100%;*/
    }
	.edit-bg:before {
		content: ' ';
		position: fixed;
		z-index: -1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url('../../asset/bg_record.png') center 0 no-repeat;
		background-size: 100%;
	}

    option {
        color: #555;
    }
</style>
