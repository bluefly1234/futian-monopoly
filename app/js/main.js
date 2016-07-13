/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/

// 变量
var showCover;
var diceState = 'diceInit'; // 掷色子界面状态

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
            var coverHide = new TimelineMax({
                onComplete: showGame
            });
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

        function showGame() {
            var gameShow = new TimelineMax({
                onComplete: showDice
            });
            gameShow.set('#game', {display: 'block', autoAlpha: 1})
            .fromTo('#game', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
        }

        // 显示掷色子界面
        function showDice() {
            if (diceState == 'diceInit') {
                $('#dice-des').html(''); // 初始将摇色子界面描述清空
            }else if (diceState == 'LMBL') {
                $('#dice-des').html('么么哒，咱们换个帅气的姿势<br>再掷一次，好运哦~'); // 摇到罗马巴黎时显示
            }else if (diceState == 'BLG') {
                $('#dice-des').html('这是童话城市布拉格，<br>没有什么不可能，Come on'); // 摇到布拉格时显示        
            }
            var diceShow = new TimelineMax();
            diceShow.set('#dice-container', {autoAlpha: 1, display: 'block'})
            .fromTo('#dice-container', 0.6, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2), force3D: true})
        }

        // 关闭掷色子界面
        function closeDice() {
            var diceClose = new TimelineMax({
                onComplete: showBLG
            });
            diceClose.to('#dice-container', 0.6, {autoAlpha: 0, scale: 0, ease: Back.easeIn.config(1.2), force3D: true})
        }

        $('#roll-btn').on('touchstart', goRoll);

        // 摇色子功能
        function goRoll() {
            var diceRoll = new TimelineMax({
                onComplete: closeDice
            });
            diceRoll.add('rollStart')
            .set('#dice1', {autoAlpha: 1}, 'rollStart')
            .set(['#dice2', '#dice3', '#dice4', '#dice5', '#dice6'], {autoAlpha: 0}, 'rollStart')
            .set('#dice3', {autoAlpha: 1}, 'rollStart+=0.1')
            .set(['#dice1', '#dice2', '#dice4', '#dice5', '#dice6'], {autoAlpha: 0}, 'rollStart+=0.1')
            .set('#dice5', {autoAlpha: 1}, 'rollStart+=0.2')
            .set(['#dice1', '#dice2', '#dice3', '#dice4', '#dice6'], {autoAlpha: 0}, 'rollStart+=0.2')
            .set('#dice2', {autoAlpha: 1}, 'rollStart+=0.4')
            .set(['#dice1', '#dice3', '#dice4', '#dice5', '#dice6'], {autoAlpha: 0}, 'rollStart+=0.4')
            .set('#dice4', {autoAlpha: 1}, 'rollStart+=0.6')
            .set(['#dice1', '#dice2', '#dice3', '#dice5', '#dice6'], {autoAlpha: 0}, 'rollStart+=0.6')
            .set('#dice6', {autoAlpha: 1}, 'rollStart+=0.7')
            .set(['#dice1', '#dice2', '#dice3', '#dice4', '#dice5'], {autoAlpha: 0}, 'rollStart+=0.7')
            .set('#dice1', {autoAlpha: 1}, 'rollStart+=0.8')
            .set(['#dice2', '#dice3', '#dice4', '#dice5', '#dice6'], {autoAlpha: 0}, 'rollStart+=0.8')
        }

        // 显示雅典
        function showYD() {
            var ydShow = new TimelineMax();
            ydShow.set('#yd', {autoAlpha: 1, display: 'block'})
            .fromTo('#yd', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
        }

        // 隐藏雅典
        function hideYD() {
            var ydHide = new TimelineMax({
                onComplete: showShare
            });
            ydHide.to('#yd', 0.4, {autoAlpha: 0})
            .set('#yd', {display: 'none'})
        }

        $('#yd-go-share').on('touchstart', hideYD);

        // 显示慕尼黑
        function showMNH() {
            var mnhShow = new TimelineMax();
            mnhShow.set('#mnh', {autoAlpha: 1, display: 'block'})
            .fromTo('#mnh', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
        }

        // 隐藏慕尼黑
        function hideMNH() {
            var mnhHide = new TimelineMax({
                onComplete: showShare
            });
            mnhHide.to('#mnh', 0.4, {autoAlpha: 0})
            .set('#mnh', {display: 'none'})
        }

        $('#mnh-go-share').on('touchstart', hideMNH);

        // 显示汉诺威
        function showHNW() {
            var hnwShow = new TimelineMax();
            hnwShow.set('#hnw', {autoAlpha: 1, display: 'block'})
            .fromTo('#hnw', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
        }

        // 隐藏汉诺威
        function hideHNW() {
            var hnwHide = new TimelineMax({
                onComplete: showShare
            });
            hnwHide.to('#hnw', 0.4, {autoAlpha: 0})
            .set('#hnw', {display: 'none'})
        }

        $('#hnw-go-share').on('touchstart', hideHNW);

        // 显示巴黎
        function showBL() {
            var blShow = new TimelineMax();
            blShow.set('#bl', {autoAlpha: 1, display: 'block'})
            .fromTo('#bl', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
        }

        // 隐藏巴黎
        function hideBL() {
            // 设置diceState
            diceState = 'LMBL'; // 罗马巴黎
            var blHide = new TimelineMax({
                onComplete: showDice
            });
            blHide.to('#bl', 0.4, {autoAlpha: 0})
            .set('#bl', {display: 'none'})
        }

        $('#bl-continue').on('touchstart', hideBL);

        // 显示布拉格
        function showBLG() {
            var blgShow = new TimelineMax();
            blgShow.set('#blg', {autoAlpha: 1, display: 'block'})
            .fromTo('#blg', 0.5, {autoAlpha: 0}, {autoAlpha: 1})
        }

        // 隐藏布拉格
        function hideBLG() {
            // 设置diceState
            diceState = 'BLG'; // 布拉格
            var blgHide = new TimelineMax({
                onComplete: showDice
            });
            blgHide.to('#blg', 0.4, {autoAlpha: 0})
            .set('#blg', {display: 'none'})
        }

        $('#blg-continue').on('touchstart', hideBLG);

        function showShare() {
            var shareShow = new TimelineMax();
            shareShow.set('#share', {display: 'block', autoAlpha: 1, perspective: 500})
            .fromTo('#share', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo('#share-arrow', 0.6, {autoAlpha: 0, y: 100}, {autoAlpha: 1, y: 0}, '-=0.2')
            .fromTo('#share-content', 0.6, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0}, '-=0.5')
        }

        function hideShare() {
            var shareHide = new TimelineMax();
            shareHide.to(['#share', '#share-arrow', '#share-content'], 0.4, {autoAlpha: 0})
            .set('#share', {display: 'none'})
        }

    });  //Document ready
})(jQuery);
