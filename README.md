# VideoBarrage
以Nodejs为服务端并基于HTML5 canvas和mp4视频实现的真实交互弹幕，支持多客户端同时连接，支持用户访问统计。

## 启动服务端（websocket）

```shell
# clone 项目
git clone git@github.com:zl-php/VideoBarrage.git

# 项目根目录运行
npm install

# 配置服务端的 conf 配置
{
    "localHost": "", #服务启动的ip，默认不填写
    "localPort": 3000 #服务启动的端口，默认3000
}

# 启动服务端
node server\server.js

```

## 打开客户端

浏览器访问 `client` 内的 `index.html`

## 说明
代码已实现了绑定用户功能，只需稍加改造就可以绑定自身的用户数据，整合到自己的项目了。

## 实现效果图
![demo.png](demo.png)