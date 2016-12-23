<template>
<div style="position: absolute;left:0;bottom:0;top:0;right:0;overflow:hidden;background:#000;">
    <div style="index:2;">
        <h3 class="assess-title">星级评价</h3>
        <section class="assess-star">
            拳击
            <div class="assess-star--ctn">
                <div class="assess-star--item" @click="setBoxing(1)" v-bind:class="{active:this.other.boxing>0}"></div>
                <div class="assess-star--item" @click="setBoxing(2)" v-bind:class="{active:this.other.boxing>1}"></div>
                <div class="assess-star--item" @click="setBoxing(3)" v-bind:class="{active:this.other.boxing>2}"></div>
                <div class="assess-star--item" @click="setBoxing(4)" v-bind:class="{active:this.other.boxing>3}"></div>
                <div class="assess-star--item" @click="setBoxing(5)" v-bind:class="{active:this.other.boxing>4}"></div>
            </div>
        </section>
        <section class="assess-star">
            踢腿
            <div class="assess-star--ctn">
                <div class="assess-star--item" @click="setKicking(1)" v-bind:class="{active:this.other.kick>0}"></div>
                <div class="assess-star--item" @click="setKicking(2)" v-bind:class="{active:this.other.kick>1}"></div>
                <div class="assess-star--item" @click="setKicking(3)" v-bind:class="{active:this.other.kick>2}"></div>
                <div class="assess-star--item" @click="setKicking(4)" v-bind:class="{active:this.other.kick>3}"></div>
                <div class="assess-star--item" @click="setKicking(5)" v-bind:class="{active:this.other.kick>4}"></div>
            </div>
        </section>
        <section class="assess-star">
            速度
            <div class="assess-star--ctn">
                <div class="assess-star--item" @click="setSpeed(1)" v-bind:class="{active:this.other.speed>0}"></div>
                <div class="assess-star--item" @click="setSpeed(2)" v-bind:class="{active:this.other.speed>1}"></div>
                <div class="assess-star--item" @click="setSpeed(3)" v-bind:class="{active:this.other.speed>2}"></div>
                <div class="assess-star--item" @click="setSpeed(4)" v-bind:class="{active:this.other.speed>3}"></div>
                <div class="assess-star--item" @click="setSpeed(5)" v-bind:class="{active:this.other.speed>4}"></div>
            </div>
        </section>
        <section class="assess-star">
            防御
            <div class="assess-star--ctn">
                <div class="assess-star--item" @click="setDefense(1)" v-bind:class="{active:this.other.defense>0}"></div>
                <div class="assess-star--item" @click="setDefense(2)" v-bind:class="{active:this.other.defense>1}"></div>
                <div class="assess-star--item" @click="setDefense(3)" v-bind:class="{active:this.other.defense>2}"></div>
                <div class="assess-star--item" @click="setDefense(4)" v-bind:class="{active:this.other.defense>3}"></div>
                <div class="assess-star--item" @click="setDefense(5)" v-bind:class="{active:this.other.defense>4}"></div>
            </div>
        </section>
        <section class="assess-star">
            力量
            <div class="assess-star--ctn">
                <div class="assess-star--item" @click="setPower(1)" v-bind:class="{active:this.other.power>0}"></div>
                <div class="assess-star--item" @click="setPower(2)" v-bind:class="{active:this.other.power>1}"></div>
                <div class="assess-star--item" @click="setPower(3)" v-bind:class="{active:this.other.power>2}"></div>
                <div class="assess-star--item" @click="setPower(4)" v-bind:class="{active:this.other.power>3}"></div>
                <div class="assess-star--item" @click="setPower(5)" v-bind:class="{active:this.other.power>4}"></div>
            </div>
        </section>
        <section class="assess-input-ctn">
            <textarea v-model.trim="other.selfRate" class="assess-recomand" type="textarea" placeholder="自我评价..."></textarea>
        </section>
        <section class="form_box-btn">
            <a class="btn-primary"v-once @click="nextStep()">{{this.$route.query.href?'完成':'预览'}}</a>
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
            tool.setPageTitle('其他');
		},
        mounted:function() {
			
		},        
        computed:{
			...mapGetters({
				other:'playerOtherInfo'
			})
        },
        data(){
            return{

            }
        },
        methods:{    
            setBoxing:function(num){
                this.other.boxing=num;
            },      
            setKicking:function(num){
                this.other.kick=num;
            },
            setSpeed:function(num){
                this.other.speed=num;
            },
            setDefense:function(num){
                this.other.defense=num;
            },
            setPower:function(num){
                this.other.power=num;
            },    
            nextStep: function() {
                if(this.other.boxing==0||this.other.kick==0||this.other.speed==0||this.other.defense==0||this.other.power==0){                    
					eventHub.$emit('showError',{msg:'请完善星级评价'});
                    return;
                }
                this.$store.commit(types.PLAYER_SAVE_OTHER,this.other);
				if(this.$route.query&&this.$route.query.href){
					this.$router.go(-1);
				}else{
					this.$router.push('view')
				}
            }
        }
    }
</script>
<style>
    .assess-recomand {
        color: #fff;
        line-height: 20px;
    }
</style>