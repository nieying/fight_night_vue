$.fn.barrager = function(barrage) {
    barrage = $.extend({
        close:true,
        bottom: 0,
        max: 10,
        speed: 10,
        color: ''
    }, barrage || {});

    var colorArr = ['#fff','blue','yellow','green','red','orange','#f60','#2b52b2','#ff5a5f'],
        time = new Date().getTime(),
        barrager_id = 'barrage_' + time,
        id = '#' + barrager_id,
        div_barrager = $("<div class='barrage' style='z-index:9999' id='" + barrager_id + "'><iframe frameborder=0 scrolling=no style='background-color:transparent; position: absolute; z-index: 9999; width: 100%; height: 100%; top: 0;left:0;'></iframe></div>").appendTo($(this)),
        window_height = $(this).height(),
        posFont = Math.floor(Math.random() * window_height - 30),
        bottom = (barrage.bottom == 0) ? (posFont<-20?-20:posFont) : barrage.bottom,
        content,
        timer = null,
        dis_right = 0;

    if(!barrage.color){
        barrage.color = colorArr[Math.ceil(Math.random()*10)] || '#fff';
    }

    div_barrager.css({
        "bottom":bottom,
        'margin-right':dis_right
    });
    $("<div class='barrage_box cl'></div>").appendTo(div_barrager).append(" <div class='z p'></div>");

    content = $("<a title='' href='javascript:;'></a>").appendTo(id + " .barrage_box .p");
    content.attr({
        'href': barrage.href,
        'id': barrage.id
    }).css({
        'color':barrage.color,
        'text-decoration': 'none',
        'white-space':'nowrap'
    }).empty().append(barrage.info);

    timer = setInterval(function() {
        console.log($(id).width())
        var window_width = $(window).width() + $(id+ ' a').width() + 20;
        if (dis_right < window_width) {
            dis_right += 1;
            $(id).css('margin-right', dis_right);
        } else {
            clearInterval(timer);
            $(id).remove();
        }
    }, barrage.speed);

    return this;
};

$.fn.barrager.removeAll=function(){
    $('.barrage').remove();
};
