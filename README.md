# ccl-small-cli
快速构建小型项目

## 适用场景
    适用于对于兼容性比较高,但是本身项目比较小型的项目,已经做了ES6和移动端css的兼容,如需别的兼容配置,可自行在 .babelrc,postcss.config.js中配置

## 使用方式 
    npm i 初始化
    npm run dev 开发模式 
    npm run build 生产模式 

## 目录结构

- config webpack配置文件
- dist 打包后的项目
- src 代码放置文件
    - html html存放位置
    - img 图片位置
    - js js代码存放位置
    - css css,scss代码存放位置
        - _common.scss 公用样式,函数存放空间
    - main.js 入口文件 

## html引入  
    无需手动引入任何文件, 需要引入图片直接引入即可

### 图片引入
    直接引入即可
     <img src="../img/xx.jpg />  

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
    1. 当前版本存在端口号冲突时,开发环境会编译失败,请自行修改 ./cofig/webpack.dev.config.js  

    2. 修改rem比例,在 ./cofig/webpack.dev.config.js   ./cofig/webpack.config.js 的 css px2rem-loader处修改  

    3. 暂时就这些,想到再更




