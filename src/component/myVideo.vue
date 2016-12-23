<template>
    <div id="willesPlay" style="position:relative">
        <div style="height:211px;overflow: hidden;" ref="videoContainer">
        </div>
        <div class="playControll">
            <div class="playPause playIcon"
                v-bind:class="{ playing: playing }"
                @click="play"></div>
            <div class="timebar">
                <span class="currentTime"></span>
                <div class="progress">
                    <div class="progress-ctn">
                        <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                            style="width: 0%"></div>

                    </div>
                </div>
                <span class="duration" style="top: 0px;right: 0;"></span>
            </div>
            <div class="otherControl">
                <!--<span class="volume glyphicon glyphicon-volume-down"></span>-->
                <span class="fullScreen glyphicon glyphicon-fullscreen" @click="entryFull"></span>
                <!--<div class="volumeBar">
            <div class="volumewrap">
                <div class="progress">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 8px;height: 40%;"></div>
                </div>
            </div>
        </div>-->
            </div>
        </div>
    </div>
    
</template>
<script>
const makeVideoPlayableInline = require('iphone-inline-video');
export default{
    name: 'my-video',
    created() {
    },
    mounted() {
        if (this.link) {
            this.init();
        }
        // var video = this.$refs.video;

        // })
    },
    props: ['thumb', 'link', 'linkOther'],
    data() {
        return {
            playing: false
        }
    },
    watch: {
        link() {
            console.log('beforeUpdate')
            let video = this.$refs.video;
            if (video) {
                video.pause();
                // debugger
            }
                // debugger
            this.init();
            this.playing = false;
            
        }
    },
    methods: {
        init() {
            // debugger
            this.$refs.videoContainer.innerHTML = `
            <video
                id="myvideo"
                class="width-full"
                style="height:100%"
                poster="${this.thumb}"
                playsinline
            >
                <source src="${this.link}" type="video/mp4">` + (this.linkOther ? `<source src="${this.linkOther}" type="video/ogv">` : '') + `
                <p class="warning">Your browser does not support HTML5 video.</p>
            </video>
            `
            let video = window.document.getElementById('myvideo');
            if (/iPhone OS/i.test(navigator.userAgent)) {
                makeVideoPlayableInline(video);
            }
            var timeFormat = function(seconds){
                var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
                var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
                return m+":"+s;
            };

            $('.progress-bar').css('width','0%');
            $('.currentTime').text(timeFormat(0));
            $('.duration').text(timeFormat(video.duration)||'00:00');

            //display current video play time
            $(video).on('timeupdate', function() {
                var currentPos = this.currentTime;
                var maxduration = this.duration;
                $('.currentTime').text(timeFormat(currentPos));

                var perc = 100 * currentPos / maxduration;
                $('.progress-bar').css('width',perc+'%');
                // $('.current').text(timeFormat(currentPos));
            });

            $(video).on('loadedmetadata', function() {
                // alert('ww');
                //set video properties

                $('.currentTime').text(timeFormat(0));
                var duration = timeFormat(video.duration);
                if(duration){
                    $('.duration').text(duration);
                }
            });
        },
        play() {
            let video = window.document.getElementById('myvideo');
            if (video) {
                if (!video.paused) {
                    this.playing = false;
                    video.pause();
                } else {
                    this.playing = true;
                    video.play();
                }
            }
        },
        entryFull() {
            let video = this.$refs.video;
            if (video) {
                if (video.webkitEnterFullScreen) {
                    video.webkitEnterFullScreen();
                }
                
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                }else if (video.webkitRequestFullScreen) {
                    video.webkitRequestFullScreen();
                }else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            }
        }
    }
}
</script>

<style>
    
    #willesPlay .playControll {
        position: absolute;
        z-index: 2147483650;
        width: 100%;
        height: 39px;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
        border-radius: 0px 0px 3px 3px;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    
    #willesPlay .fullControll {
        background: rgba(0, 0, 0, .5);
    }
    
    #willesPlay .fullControll .timebar span {
        color: #FFFFFF;
    }
    
    #willesPlay .playControll .playPause {
        float: left;
        width: 32px;
        height: 39px;
        background: url(../asset/icon_play.png) 0px 0px no-repeat;
        background-position: 50%;
        cursor: pointer;
    }

    #willesPlay .playControll .playPause.playing {
        background: url(../asset/icon_pause.png) no-repeat;
        background-size: 32px 39px;
    }
    
    #willesPlay .playControll .playIcon {
        background-size: 18px;
    }
    /*进度条*/
    
    #willesPlay .playControll .timebar {
        position: relative;
        float: left;
        width: calc(100% - 76px);
        line-height: 48px;
        overflow: hidden;
        margin: 0 auto;
        margin: 0;
    }
    
    #willesPlay .playControll .timebar .progress {
        width: 100%;
        margin: 18px 0;
        cursor: pointer;
        padding: 0 58px;
        box-sizing: border-box;
    }
    
    #willesPlay .playControll .timebar .progress .progress-ctn {
        background-color: rgba(255, 255, 255, .6);
        height: 2px;
    }
    
    #willesPlay .playControll .timebar .progress .progress-bar {
        height: 2px;
        background-color: #2b52b2;
        position: relative;
    }
    
    #willesPlay .playControll .timebar .progress .progress-bar:after {
        content: '';
        width: 10px;
        height: 10px;
        background-color: #fff;
        display: block;
        border-radius: 50%;
        position: absolute;
        margin-top: -4px;
        right: 0;
    }
    
    #willesPlay .playControll .timebar span {
        position: absolute;
        width: 58px;
        text-align: center;
        height: 39px;
        line-height: 39px;
    }
    
    #willesPlay .otherControl {
        right: 0;
        position: absolute;
    }
    
    #willesPlay .otherControl span {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        vertical-align: middle;
        font-size: 20px;
        margin: 9px 7px;
        background: url(../asset/icon_full.png) no-repeat;
        cursor: pointer;
    }
    
    #willesPlay .otherControl span:nth-child(1) {
        background-size: 18px;
        background-position: 50%;
    }
    /*#willesPlay .otherControl span:nth-child(2){
    background-position: -171px 0px;
}*/
    
    #willesPlay .otherControl span:nth-child(2) {
        color: #919597;
    }
    /*音量*/
    /*#willesPlay .otherControl .volumeBar {
        display: none;
        position: absolute;
        top: -110px;
        left: 4px;
        width: 26px;
        height: 100px;
        background: #f1f2f2;
        border-radius: 4px;
        cursor: pointer;
    }

    #willesPlay .otherControl .volumeBar:after {
        content: "";
        display: block;
        position: absolute;
        bottom: -7px;
        left: 5px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #f1f2f2;
    }

    #willesPlay .otherControl .volumeBar .volumewrap {
        background: #a2a7aa;
        width: 8px;
        height: 80px;
        position: absolute;
        bottom: 10px;
        left: 9px;
        border-radius: 4px;
    }

    #willesPlay .otherControl .volumeBar .progress {
        background: none;
    }

    #willesPlay .otherControl .volumeBar .progress-bar {
        position: absolute;
        bottom: 0px;
        left: 0px;
        border-radius: 4px;
    }*/
    
    video::-webkit-media-controls-enclosure {
        /*禁用播放器控制栏的样式*/
        display: none !important;
    }
    
    :-webkit-full-screen {}
</style>