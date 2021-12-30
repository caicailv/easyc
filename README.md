# easyc
快速构建活动页


## 什么项目适合用这个脚手架来写?
    easyc适用于简单的一次性页面(移动端,PC端活动),对兼容要求比较高,本身比较简单,不太合适用大型框架来构建的项目.

## 我能帮你做什么?  

    es6转义  
    开发模式热更新
    生成模式一键打包
    手机热更新调试
    内置SCSS,自动兼容性CSS
    重复代码封装,一键生成基本架构
    支持jq,layui等小型库
    内置移动端适配方案
    内置toast,弹框等
    解决1px border问题

## 适用场景
    适用于对于兼容性比较高,但是本身项目比较小型的项目,已经做了ES6和移动端css的兼容,如需别的兼容配置,可自行在 .babelrc,postcss.config.js中配置

## 使用方式 
    npm i easyc-cli -g 安装cli
    easyc init [project-name]
    cd [project-name]
    npm i 初始化
    npm run dev 开发模式 
    npm run build 生产模式 
    
    如果你不想全局安装, 也可以直接clone本项目到本地直接使用

## 目录结构

- config webpack配置文件
- dist 打包后的项目
- src 代码放置文件
    - img 图片位置
    - js js代码存放位置
    - css css,scss代码存放位置
        - _common.scss 公用样式,函数存放空间
    - main.js 入口文件 
    - index.html html文件
## html引入  
    无需手动引入任何文件, 需要引入图片直接引入即可

### 图片引入
    直接引入即可
     <img src="./img/xx.jpg />  

### css.scss引入 
    在main.js中引入,无需html中引入,但是每一个html页面最好用一个class来包裹住其余样式, 否则会有命名冲突问题

### js 
    ES6代码可以直接在 main.js中写, 或者单独拆分文件,再引入,最好是封成函数, 在html页面不能写ES6的代码,会有兼容性问题
    写好需要引入到页面中使用的函数后,需要手动挂载至window  

    引入jquery插件时,需要把写好的方法或class暴露出来

```js
    import $ from 'jquery';
    window.$ = $;
```
## 注意事项:

    1. 修改rem比例,或者使用其他单位,在 ./cofig/webpack.dev.config.js   ./cofig/webpack.config.js 的 css px2rem-loader处修改
    
    2. 对于1px border问题 ,这里已经内置了解决方案,会自动转义,如果想自己处理,也可以自行修改postcss配置,需要注意的是,本脚手架处理的方案是通过伪元素进行放缩,如果伪元素已经用了, 那最好包裹一层div或采用其他方案
    
    3. 如果想在某部分元素上不使用rem转换,则需要把px写成 Px
    1px => 1Px

## 更新日志
    20.09.01 增加编译模式多文件提示,修复打包后html被压缩的问题
    20.11.12    
        1. 更新头部meta字段 
        2. 增加移动端调试插件
        3. 登录弹窗input高度变量化 
        4. 弹窗js调用模板
    
    20.12.11
        1. 默认不添加调试插件以免打包后的包过大
        2. 增加loading方法


    2021.01.28
        1. 将所有图片统一打包,去除图片过大警告

    2021.01.29
        1. 将vconsole替换为eruda

    2021.03.03
        1. 直接使用copywebpackplugin进行图片复制会在img目录为空时,抛出无法打包的错误,这里先判断是否有图片,再决定是否使用该插件
    
    2021.12.29
        1. 使用dart-sass代替node-sass,以避免安装node-sass的各种问题.
        2. 删除无用的html示例代码
    2021.12.30
        1. 将dart-sass移到开发依赖
        2. 添加快捷发布脚本