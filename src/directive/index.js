import Vue from 'vue';
import { tool } from 'app-utils';

module.exports = {
    init: function (v) {
        Vue.directive('kg-input', {
            bind: function (el) {
                // el.addEventListener('focus', function() {
                //     let val = parseFloat(this.value);
                //     this.type = 'number';
                //     this.value = val;
                // })
                // el.addEventListener('blur', function() {
                //     if (this.value) {
                //         this.type = 'text';
                //         this.value = this.value + 'kg';
                //     }
                // })
            },
            // update: function (value) {
            //     this.el.innerHTML =
            //         'directive name - ' + this.name + '<br>' +
            //         'directive expression - ' + this.expression + '<br>' +
            //         'directive argument - ' + this.arg + '<br>' +
            //         'directive modifiers - ' + JSON.stringify(this.modifiers) + '<br>' +
            //         'directive value - ' + value
            // }
        });
        Vue.directive('input', {
            bind: function (el) {
                // debugger;
                el.addEventListener('focus', function () {
                    this.classList.remove('error');
                });
            }
        });
        Vue.directive('birth-input', {
            bind: function (el) {
                // el.addEventListener('focus', function () {
                //     if (!this.value) {
                //         this.value = '1990-01-01';
                //     }
                // });
            }
        });
        Vue.directive('cm-input', {
            bind: function (el) {
                // el.addEventListener('focus', function() {
                //     let val = parseFloat(this.value);
                //     this.type = 'number';
                //     this.value = this.val;
                // })
                // el.addEventListener('blur', function() {
                //     if (this.value) {
                //         this.type = 'text';
                //         this.value = this.value + 'cm';
                //     }
                // })
            }
        });
        Vue.directive('date-input', {
            bind: function (el) {
                // el.addEventListener('click', function () {
                //     // debugger;
                //     document.querySelector('[bindel="' + this.dataset.bindel + '"]').focus()
                // });
                el.addEventListener('blur', function () {
                    // this.type = 'text';
                    // this.value='2012-02-02'
                })
            }
        });
        Vue.directive('place-holder',{
            bind:function(el){
                el.addEventListener('focus',function(event){
                    // debugger;
                    if(this.placeholder){
                        this.placeholders = this.placeholder;
                    }
                });
                el.addEventListener('keyup',function(){
                    if(this.value){
                        this.placeholder='';
                    }else{
                        this.placeholder='我来说一说';
                    }

                })
            }
        });
        Vue.directive('file-upload', {
            bind: function (el) {
                el.onchange = function () {
                    if (!this.files.length) return;

                    var files = Array.prototype.slice.call(this.files);

                    if (files.length > 9) {
                        alert("最多同时只可选择9张图片");
                        return;
                    }

                    files.forEach(function (file, i) {
                        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

                        var reader = new FileReader();

                        var li = document.createElement("li");
                        li.innerHTML = '<div class="progress"><span></span></div>';
                        // $(".img-list").append($(li));

                        reader.onload = function () {
                            var result = this.result;
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
                                // $(li).css("background-image", "url(" + data + ")");

                                img = null;
                            }

                        };

                        reader.readAsDataURL(file);
                    })
                };
            }
        })
    }
};
