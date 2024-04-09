# 微信定时发送消息 服务端

### 介绍：

本项目为**微信定时发送消息** 服务端。

包括了 ws 信息交互、图片上传至阿里云 oss 服务。

前端地址：[https://github.com/tiankainobug/WechatBotHtml](https://github.com/tiankainobug/WechatBotHtml)

### 技术框架：

🏵️ wechaty

🏵️ ali-oss:阿里云 oss

🏵️ express

🏵️ websocket

### 启动方式：

1.修改配置

配置阿里云 oss 相关

打开*config* 下的`config.js`

修改对应的accessKeyId、accessKeySecret、region、bucket

具体为多少参考阿里云 oss 文档：[上传文件](https://help.aliyun.com/zh/oss/developer-reference/streaming-upload-1?spm=a2c4g.11186623.0.i1)



2. 启动

```
node app.js
```

