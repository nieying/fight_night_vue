<template>
<div style="position: absolute;left:0;bottom:0;top:0;right:0;overflow:hidden;background:#000;">
    <div class="form_box">
        <section class="form_box--item">
            <label class="form_box--head">获取头衔</label>
            <input style="left:0" v-model.trim="record.honor" class="form_box--field form_box--input" placeholder="" type="text" autocomplete="off"
                name="honor">
        </section>
        <section class="form_box--item">
            <label class="form_box--head record-head"><span class="red_txt">*</span>赛事总成绩</label>
            <div class="play-records">
                <div class="play-records-line">
                    <div class="play-records-l play-records-field">
                        <input v-model.trim="record.win" v-input class="play-records-input" type="number" name="win">
                        <span class="play-records-unit">胜</span>
                    </div>
                    <div class="play-records-r play-records-field">
                        <input v-model.trim="record.fail" v-input class="play-records-input" type="number" name="fail">
                        <span class="play-records-unit">败</span>
                    </div>
                </div>
                <div class="play-records-line line-two">
                    <div class="play-records-l play-records-field">
                        <input v-model.trim="record.deuce" v-input class="play-records-input" type="number" name="deuce">
                        <span class="play-records-unit">平</span>
                    </div>
                    <div class="play-records-r play-records-field">
                        <input v-model.trim="record.ko" v-input class="play-records-input" type="number" name="ko">
                        <span class="play-records-unit">KO</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>参赛年数</label>
            <input style="left:0" v-model.trim.number="record.macthTime" v-input class="form_box--field form_box--input" type="number" name="macthTime" autocomplete="off">
        </section>
        <section class="form_box--item">
            <label class="form_box--head"><span class="red_txt">*</span>教练姓名</label>
            <input style="left:0" v-model.trim="record.coach" v-input class="form_box--field form_box--input" type="text" name="coach" autocomplete="off">
        </section>
        <section class="form_box--item">
            <label class="form_box--head">训练视屏(链接)</label>
            <input style="left:0" v-model.trim="record.drillVideo" class="form_box--field form_box--input" type="text" name="drillVideo" autocomplete="off">
        </section>
        <section class="form_box-dis"></section>
        <h3 class="record-title">近期成绩<span class="record-title--tip">(注:请添加1-2次近期赛事成绩)</span></h3>
        <a @click="addRecord()" style="right:22px" class="btn-addRecord"></a>
        <section v-for="item in record.item" class="record-ctn">
            <a @click="editRecord(item.id)" class="btn-editRecord"></a>
            <div class="record-ctn--item">比赛名称:<span class="record-ctn--txt">{{item.matchName}}</span></div>
            <div class="record-ctn--item">体重:<span class="record-ctn--txt">{{item.weight}}kg</span></div>
            <div class="record-ctn--item">参赛日期:<span class="record-ctn--txt">{{item.matchDate}}</span></div>
            <div class="record-ctn--item">对抗选手:<span class="record-ctn--txt">{{item.opponent}}</span></div>
            <div class="record-ctn--item">比赛结果:<span class="record-ctn--txt">{{getGameResult(item.matchResult)}}</span></div>
        </section>

        <section class="form_box-btn">
            <a class="btn-primary" type="button" v-once @click="nextStep()">{{this.$route.query.href?'完成':'下一步'}}</a>
        </section>
    </div>
</div>
</template>
<script>
    import {validate, tool} from 'app-utils';
    import eventHub from 'src/eventHub';
	import { mapGetters } from 'vuex';
	import * as types from 'src/vuex/mutation-types';

    export default{
        created: function() {
            tool.setPageTitle('近期成绩');
		},
        mounted:function() {

		},
        data(){
            return{
            }
        },
        computed:{
			...mapGetters({
				record:'playerRecordInfo'
			})
        },
        methods:{
            getGameResult:function(val){
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
			addRecord:function(){
                this.editRecord('new');
			},
			editRecord:function(id){
				this.$router.push('recordEdit/'+id)
			},

			checkValid:function(){
				var result  =true;
				var el = null;
				if(!this.record.win&&this.record.win!==0){
					// eventHub.$emit('showError',{msg:'赛事成绩不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = this.$el.querySelector('input[name="win"]');
					result=false;
                }else if(!this.record.deuce&&this.record.deuce!==0){
					// eventHub.$emit('showError',{msg:'赛事成绩不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = this.$el.querySelector('input[name="deuce"]');
					result=false;
                }else if(!this.record.fail&&this.record.fail!==0){
					// eventHub.$emit('showError',{msg:'赛事成绩不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = this.$el.querySelector('input[name="fail"]');
					result=false;
                }else if(!this.record.ko&&this.record.ko!==0){
					// eventHub.$emit('showError',{msg:'赛事成绩不能为空'});
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					el = this.$el.querySelector('input[name="ko"]');
					result=false;
                }else if (!this.record.macthTime){
					el = this.$el.querySelector('input[name="macthTime"]');
					// eventHub.$emit('showError',{msg:'参赛年数不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if (!this.record.coach){
					el = this.$el.querySelector('input[name="coach"]');
					// eventHub.$emit('showError',{msg:'教练姓名不能为空'})
					eventHub.$emit('showError',{msg:'请完善必填信息'});
					result = false;
				}else if(this.record.item.length===0){
					eventHub.$emit('showError',{msg:'请添加1-2次近期赛事成绩'})
                    result=false;
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
                this.$store.commit(types.PLAYER_SAVE_RECORD,this.record);

                if(this.$route.query&&this.$route.query.href){
					this.$router.go(-1);
				}else{
					this.$router.push('pic')
				}
            }
        }
    }
</script>

<style>
    .play-records {
        overflow: hidden;
        color: #9a9a9a;
    }

    .play-records-l {
        float: left;
        width: 45%;
    }

    .play-records-r {
        float: right;
        width: 45%;
    }

    .form_box--head.record-head {
        margin-top: 14px;
    }

    .play-records-field {
        border-bottom: 1px solid #45484a;
        padding-right: 26px;
        text-align: right;
        box-sizing: border-box;
    }
    .play-records-line{
        overflow: hidden;
    }
    .play-records-line.line-two {
        margin-top: 20px;
    }

    .play-records-unit {
        position: absolute;
        line-height: 24px;
        margin-left: 6px;
        margin-top: -24px;
    }

    input.play-records-input {
        box-sizing: border-box;
        width: 100%;
        height: 24px;
        background: transparent;
        text-align: center;
        color: #fff;
    }

    .play-records-input.error {
        border: 1px solid #ff5a5f;
        background-color: rgba(255, 255, 255, .16);
    }

    .record-ctn {
        margin-bottom: 10px;
    }
</style>
