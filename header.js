//ナビゲーション用
;$(function(){
  $('#gnav_btn').on('click', function(){
    if($(this).hasClass('open')){
      $(this).removeClass('open');
      $('header nav').removeClass('open').stop().slideUp(500);
      $('#outside').fadeOut(100).addClass("disnone");
      $('body').removeClass('add_overray');
    }else{
      $(this).addClass('open');
      $('header nav').addClass('open').stop().slideDown(500);
      $('#outside').fadeIn(100).addClass("disnone");
      $('body').addClass('add_overray');
    }
  });
  $('#outside').on('click', function(){
    $('#gnav_btn').removeClass('open');
    $('header nav').removeClass('open').stop().slideUp(500);
    $(this).fadeOut(100).addClass("disnone");
    $('body').removeClass('add_overray');
  });
  $('#nav_inner a').on('click', function() {
        $('#gnav_btn').removeClass('open');
    $('header nav').removeClass('open').stop().slideUp(500);
    $('#outside').fadeIn(100).addClass("disnone");
    $('body').removeClass('add_overray');
    });
});
//スクロールフェードイン
/* 到達したら要素を表示させる */
function showElementAnimation() {

  var element = document.getElementsByClassName('fadeIn');
  if(!element) return; // 要素がなかったら処理をキャンセル
            
  var showTiming = window.innerHeight > 768 ? 200 : 80; // 要素が出てくるタイミングはここで調整
  var scrollY = window.pageYOffset; //スクロール量を取得
  var windowH = window.innerHeight; //ブラウザウィンドウのビューポート(viewport)の高さを取得
            
  for(var i=0;i<element.length;i++) { 
    var elemClientRect = element[i].getBoundingClientRect(); 
    var elemY = scrollY + elemClientRect.top; 
    if(scrollY + windowH - showTiming > elemY) {
    element[i].classList.add('scrollin');
    } else if(scrollY + windowH < elemY) {
    // 上にスクロールして再度非表示にする場合はこちらを記述
    element[i].classList.remove('scrollin');
    }
  }
}
showElementAnimation();
window.addEventListener('scroll', 
showElementAnimation);


    // マウスストーカー関連の要素（任意で変更してください）
    const mouseStalker = "#stkr";           // マウスストーカーになる要素を指定
    const mouseTarget = ".stkr-target";     // リンクなどアクションを付けたい要素を指定
    const mouseStalkerArea = "#stkr-area";  // マウスストーカーが機能する要素を指定

    // 処理で使う変数たち
    const stkrSize = parseInt($(mouseStalker).css("width").replace(/px/, ""));
    const stkrPosX = parseInt($(mouseStalker).css("left").replace(/px/, ""));
    const stkrPosY = parseInt($(mouseStalker).css("top").replace(/px/, ""));
    const cssPosAjust = stkrPosX + (stkrSize / 2);
    let stkrFix = false;
    let scale = 1;
    let scroll = 0;

    // 追従用の処理
    $(mouseStalkerArea).hover(function(){
      $(mouseStalkerArea).mousemove(function(e){
        if(stkrFix == false){
          let x = e.clientX - cssPosAjust;
          let y = e.clientY + scroll - cssPosAjust;
          $(mouseStalker).css({
            "transform": "translate(" + x + "px," + y + "px) scale(" + scale + ")",
          });
        }
      });
    }, function(){
      $(mouseStalker).css({
        "transform": ""
      });
    });

    // リンクホバーの処理
    $(mouseTarget).hover(function(){
      stkrFix = true;
      scale = 2;
      let _width = parseInt($(this).css("width").replace(/px/,""));
      let _top = $(this).position().top;
      let _left = $(this).position().left;
      let x = _left - stkrPosX - (stkrSize / 2) + (_width / 2);
      let y = _top - stkrPosX;
      $(mouseStalker).css({
        "transform": "translate(" + x + "px," + y + "px) scale(" + scale + ")",
      }).addClass($(this).data("color"));
    }, function(){
      stkrFix = false;
      scale = 1;
      $(mouseStalker).removeClass($(this).data("color"));
    });
    
    $(window).scroll(function(){
      scroll = $(window).scrollTop();
    });
    
    $(window).on('load',function(){
      $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述
      
      //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
      $("#splash").delay(1500).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
        
        $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
        
      });
      //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
      
      //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
      $('.splashbg').on('animationend', function() {    
        //この中に動かしたいJSを記載
        //=====ここまで背景が伸びた後に動かしたいJSをまとめる
        
      });
    });

    // eachTextAnimeにappeartextというクラス名を付ける定義
function EachTextAnimeControl() {
  $('.fv-text').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("appeartext");

    } else {
      $(this).removeClass("appeartext");
    }
  });
}

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  //spanタグを追加する
  var element = $(".fv-text");
  element.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split('').forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
        } else {
          var n = i / 10;
          textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
        }

      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  EachTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述
