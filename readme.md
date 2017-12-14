# 友云采knockout 多页面应用项目模板
- 基于konckout ko-epui kero
- 使用vue-cli初始化工具
- 初始化多页面的结构

## for webpack 3.x 
see [https://github.com/yonyouyc/ko-multipage-template/tree/webpack3.x](https://github.com/yonyouyc/ko-multipage-template/tree/webpack3.x)

## 如何使用

1. 安装vue-cli
see [如何安装vue-cli](https://github.com/vuejs/vue-cli)
2. 使用vue-cli初始化项目
vue init yonyouyc/ko-multipage-template <project-name>

project-name 请输入自己的project-name

## 开发约束:
- 1.多页面入口地址:src/pages/**/index.js(请保证所有入口页面都叫index.js)
- 2.首页入口地址:src/pages/index/index.js
- 3.静态资源地址:static/.有需要访问静态资源时,请使用static/*的链接
- 4.开发服务代理:见config/index.js. 中dev下的proxyTable
- 5.本地端口号修改:见config/index.js. dev下的port

## 学习相关:
- [knockout文档](http://knockoutjs.com/)
- [kero文档](http://tinper.org/dist/kero/docs/overview.html)
- [ko-epui文档](https://github.com/songhlc/ko-epui)

-[bug反馈](https://github.com/yonyouyc/ko-multipage-template/issues)
