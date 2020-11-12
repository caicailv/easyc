import './js/flexible' //屏幕适配
import './css/reset.css' //基础样式
import '@/css/index.scss' //页面样式
import '@/css/rule.scss' //页面样式
import '@/css/popup.scss' //弹窗样式
import $ from './js/jquery' //使用插件
import popup from './js/popup'
import toast from './js/showText'
import VConsole from 'vConsole'
window.$ = $
window.toast = toast
window.popup = popup

// 如果需要移动端调试
// var vConsole = new VConsole() 
