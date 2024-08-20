# LingChair

***For English-speaker: This project isn't finished, multi languages is not supported now. I'm sorry with that.***

铃之椅是一个轻量、可扩展且开源的即时消息项目

***本项目还在开发中，现诸多功能全部还未制作，如果需要请暂时使用 LingChair-V0***

## 内容

* [使用](#使用)
* [配置](#配置)
* [制作背景](#制作背景)
* [协议](#协议)
* [鸣谢](#鸣谢)

## 使用

### 服务端

你需要先安装 [Node.js](https://nodejs.org)，然后 clone 或者下载本项目代码

先运行

```bash
npm install
```

然后运行

```bash
npm run start
```

如果你不想使用 npm 启动，你也可以用下面这行命令

```bash
node index.js --build
```

等候服务端启动之后，就可以使用啦

### 客户端

需要至少 Chromium 84 以上内核的浏览器(低版本我无法保证)

找到你服务器的IP地址或者域名及端口，直接访问即可

## 配置

请参考[这个文件](./src/config.js)内的模板

## 制作背景

qqwx都认识吧，这俩玩意十分，十分，十分的臃肿，该有的功能没有，不该有的一大堆，甚至禁止使用旧版本，简直就是在强碱用户的手机运存和储存

更糟糕的是，这破玩意已经深度绑定了我们的生活，几乎全国人都在用，不用都不行

虽然我不指望能靠这么一个项目去改变现状，但是我还是希望能给即时通讯多一个更好的选择

因此，铃之椅诞生了

## 协议

本项目使用 Apache License 2.0 进行开源

我们欢迎各位对本项目提出修改意见

不推荐将本项目用于商业用途，鄙人一个小项目大概率是没办法超越国内现在的IM的

## 鸣谢

排名不分先后

* LingChair 使用到的开源项目
    * React
    * MDUI
    * jQuery
    * =======
    * Babel
    * Express
    * Uglify-js
    * Clean-CSS
    * Socket.io
