<template>
  <section class="form_box--item">
    <label class="form_box--head"><span v-if="required" class="red_txt">*</span>{{label}}</label>
    <input class="form_box--field form_box--input" v-bind:placeholder="placeholder" v-bind:value="value" v-bind:type="type" autocomplete="off"
      v-on:input="updateValue($event.target.value)"  v-on:focus="focus" v-on:blur="blur">
  </section>
</template>
<script>
export default{
  props:{   
    type:{
      type:String,
      default:'text'
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder:{
      type:String,
      default:''
    },
    required:{
      type:Boolean,
      default:false
    },
    unit:{
      type:String,
      default:''
    }
  },
  created:function(){
    // debugger;
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    focus:function () {
      if(this.unit!==''){
        var val = parseFloat(this.value);
        this.type = 'number';
        this.value = val;
      }
    },
    blur:function () {
        if (this.unit&&this.value) {
            this.type = 'text';
            this.value = this.value + this.unit;
        }
    }
  }
}
</script>