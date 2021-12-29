import './js/flexible' //屏幕适配
import './css/reset.css' //基础样式
import '@/css/index.scss' //页面样式
import '@/css/popup.scss' //弹窗样式
import '@/css/loading.scss' //弹窗样式
import $ from './js/jquery' //使用插件
import popup from './js/popup'
import { loadingShow, loadingHide,toast } from './js/showText'
// import eruda from 'eruda'
window.$ = $
window.toast = toast
window.loadingShow = loadingShow //开启loading
window.loadingHide = loadingHide //关闭loading
window.popup = popup


// 如果需要移动端调试
// eruda.init()
