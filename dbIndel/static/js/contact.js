/**
 * Created by yangmqglobe on 2017/6/6.
 */
$(function () {
    var mail_1 = ['huangml', '@', 'suda.edu.cn'];
    var mail_2 = ['csixl', '@', 'nus.edu.sg'];

    $('#mail_1').attr({
        'href': 'mailto:'+mail_1.join('')
    });
    $('#mail_1').html(mail_1.join('')+'(Moli Huang)');
    $('#mail_2').attr({
        'href': 'mailto:' +mail_2.join('')
    });
    $('#mail_2').html(mail_2.join('')+'(Xu Liang)');
});