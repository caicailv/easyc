import $ from './jquery'
var st_timer = null
$(function () {
  showInit()
})

function showInit() {
  //透明黑色背景
  var checkShowInit = true
  $("<div id='st_mask' onclick='closeMask()'></div>").appendTo('body').css({
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.4)',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'none',
    'z-index': '1',
  })

  //---------------------------------在body最后添加Toast节点
  $("<div id='st_toastBox'></div>").appendTo('body').css({
    width: '100%',
    position: 'fixed',
    left: '0',
    bottom: '10%',
    'text-align': 'center',
    display: 'none',
  })
  $("<span id='st_toastContent'></span>").appendTo('#st_toastBox').css({
    color: '#fff',
    background: 'rgba(0,0,0,.5 )',
    padding: '10px 22px',
    'border-radius': '20px',
    'max-width': '80%',
    display: 'inline-block',
  })
}
function showToast(obj) {
  if (!obj.text) {
    return false
  }
  clearTimeout(st_timer)
  $('#st_toastBox').hide()

  var text = obj.text
  var time = parseInt(obj.time ? obj.time : 2300)
  var speed = obj.speed ? obj.speed : 'normal'
  var bottom = obj.bottom ? obj.bottom : '10%'
  if (obj.zindex) {
    var zindex = parseInt(obj.zindex)
    $('#st_mask').css({ 'z-index': zindex - 1 })
    $('#st_toastBox').css({ 'z-index': zindex })
  } else {
    $('#st_mask').css({ 'z-index': 1 })
    $('#st_toastBox').css({ 'z-index': 2 })
  }

  $('#st_toastBox').css({ bottom: bottom })

  $('#st_toastContent').text(text)
  $('#st_toastBox').fadeIn(speed)
  st_timer = setTimeout(function () {
    $('#st_toastBox').fadeOut()
  }, time)
}

function closeMask() {
  $('#st_mask,#st_alertBox,#st_confirmBox').hide()
}
export function toast(msg) {
  $(function () {
    showToast({
      text: msg,
      bottom: '50%',
      zindex: 99999,
      speed: 500,
      time: 1000,
    })
  })
}


export function loadingShow(text='加载中') {
  let html = `
  <div class="loade_com">
  <div class="loading_box">
  <div class="loader">
    <div class="loader-inner ball-spin-fade-loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <p class="fuh">${text}……</p>
</div>
  </div>
  `
  $('body').append(html)
}

export function loadingHide() {
  $('.loade_com').remove()
}
