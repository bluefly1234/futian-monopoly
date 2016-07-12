/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/

// 变量
var showCover;

// 预加载
var sourceArr = [
    'images/cover-bg.jpg',
    'images/bl.png',
    'images/blg.png',
    'images/btns-s5c195e389e.png',
    'images/car.png',
    'images/close-btn.png',
    'images/dice-s71513b1403.png',
    'images/earth.png',
    'images/hnw.png',
    'images/lm.png',
    'images/logo.png',
    'images/mcar.png',
    'images/place-bg.jpg',
    'images/right-content.png',
    'images/rule.png',
    'images/rule-btn.png',
    'images/share-arrow.png',
    'images/share-content.png',
    'images/slogan.png',
    'images/start-btn.png',
    'images/wrong-content.png',
    'images/yd.png',
    'media/bgmusic.mp3'
]; //需要加载的资源列表

new mo.Loader(sourceArr,{
	onLoading : function(count,total){
		console.log('onloading:single loaded:',arguments);
        console.log('加载中...（'+count/total*100+'%）');
        var loadPercent = Math.floor(count/total*100);
        $('#loading-num').html(loadPercent+'%');
	},
	onComplete : function(time){
		console.log('oncomplete:all source loaded:',arguments);
        // $('#bg-music').attr('src', 'media/bgmusic.mp3');
        var hideLoading = new TimelineMax({
            delay: 1,
            onComplete: function () {
                // TweenMax.set('#music-control', {autoAlpha: 1});
                showCover();

            }
        });
        hideLoading.to('#loading-num', 0.6, {autoAlpha: 0})
                    .set('#loading', {display: 'none'})
	}
});

(function($) {
    $(document).ready(function() {
        console.log('Ready');

        showCover = function () {
            var coverShow = new TimelineMax();
            coverShow.set('#cover', {autoAlpha: 1, display: 'block', perspective: 500})
            .fromTo('#cover', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo('#earth', 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2), force3D: true})
            .fromTo('#cover-car', 0.8, {autoAlpha: 0, x: 500,  scale: 0}, {autoAlpha: 1, x: 0, scale: 1, force3D: true}, '-=0.4')
            .fromTo('#slogan', 0.6, {autoAlpha: 0, scale: 1.5}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2)})
            .add('coverBtn')
            .fromTo('#rule-btn', 0.6, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0, force3D: true}, 'coverBtn')
            .fromTo('#start-btn', 0.6, {autoAlpha: 0, y: 100}, {autoAlpha: 1, y: 0, force3D: true}, 'coverBtn')
        }

        function hideCover() {
            var coverHide = new TimelineMax();
            coverHide.add('coverHideStart')
            .to('#start-btn', 0.5, {autoAlpha: 0, y: 100}, 'coverHideStart')
            .to('#rule-btn', 0.5, {autoAlpha: 0, y: -100}, 'coverHideStart')
            .to('#cover-car', 0.6, {autoAlpha: 0, scale: 1.2, x: -120, ease: Back.easeIn.config(1.2)}, '-=0.5')
            .to('#slogan', 0.6, {autoAlpha: 0, scale: 1.5, ease: Back.easeIn.config(1.2)}, '-=0.5')
            .to('#earth', 0.6, {autoAlpha: 0, scale: 1.5, ease: Back.easeIn.config(1.2)}, '-=0.5')
            .to('#cover', 0.5, {autoAlpha: 0}, '-=0.1')
            .set('#cover', {display: 'none'})

        }
        $('#start-btn').on('touchstart', hideCover);
        $('#rule-btn').on('touchstart', showRule);
        $('#close-rule').on('touchstart', closeRule);

        function showRule() {
            var ruleShow = new TimelineMax();
            ruleShow.set('#rule', {autoAlpha: 1, display: 'block'})
            .fromTo('#rule', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo('#rule-content', 0.6, {autoAlpha: 0, y: -1000}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(0.6)}, '-=0.1')
        }

        function closeRule() {
            var ruleClose = new TimelineMax();
            ruleClose.to('#rule-content', 0.6, {autoAlpha: 0, y: -1000, ease: Back.easeIn.config(0.6)})
            .to('#rule', 0.4, {autoAlpha: 0}, '-=0.1')
            .set('#rule', {display: 'none'})
        }

    });  //Document ready
})(jQuery);
