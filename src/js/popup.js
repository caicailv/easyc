import $ from './jquery' //使用插件

/* 
            popup
            title: 是否展示标题
            content: 内容
            confirmText: 确认按钮文字 如果传空表示不展示确认按钮
            confirmCallback: 点击确认回调,函数内this是该弹窗dom对象
            offCallback: 关闭回调,函数内this是该弹窗dom对象
            tips: 提示语文字
            conLeft: //展示左按钮, 文字是按钮文案
            conRight: //展示左按钮, 文字是按钮文案
            conLeftCallback 左按钮点击回调
            conRightCallback 右按钮点击回调
            rule 规则文案
*/

let popupId = 0
export default function popup({
  title = '',
  content = '',
  confirmText = '我知道了',
  confirmCallback = function () {},
  offCallback = function () {},
  offShow = false,
  tips = '',
  rule = '',
  conLeft = '',
  conRight = '',
  conLeftCallback = function () {},
  conRightCallback = function () {},
}) {
  popupId++
  let html = `
  <div class="popup show" id="popup_${popupId}">
    <div class="popup_row  ${rule ? 'rulerow' : ''} ${title ? 'tit' : ''}">
        ${offShow ? '<div class="pop_off"></div>' : ''}
        ${title ? '<div class="pop_title"></div>' : ''}
        ${content ? `<div class="content">${content}</div>` : ''}
        ${rule ? `<div class="rule">${rule}</div>` : ''}
        ${
          conLeft && conRight
            ? `<div class="fot_rot">
            <div class="fot_left">${conLeft}</div>
            <div class="fot_right">${conRight}</div>
        </div>`
            : ''
        }
        ${confirmText !== '' ? `<div class="fot_btn">${confirmText}</div>` : ''}
        ${tips ? `<div class="p_tips">${tips}</div>` : ''}
      </div>
    </div>
  `
  $('body').append(html)
  const popElement = $('#popup_' + popupId)[0]
  $(popElement)
    .find('.fot_btn')
    .click(function () {
      confirmCallback.call(popElement)
    })
  $(popElement)
    .find('.pop_off')
    .click(function () {
      offCallback.call(popElement)
      $(popElement).remove()
    })
  $(popElement)
    .find('.pop_off2')
    .click(function () {
      offCallback.call(popElement)
      $(popElement).remove()
    })
  $(popElement)
    .find('.fot_left')
    .click(function () {
      conLeftCallback.call(popElement)
    })
  $(popElement)
    .find('.fot_right')
    .click(function () {
      conRightCallback.call(popElement)
    })
}
