import express, {json} from 'express'
import expressWS from 'express-ws'
import {handleWsMeg} from "./utils/handleWsMeg.js";

const app = express()
app.use(express.json());
expressWS(app);

// 处理 WebSocket 连接
app.ws('/websocket/robot', function (ws, req) {
  console.log('connect success')

  // 使用 ws 的 send 方法向连接另一端的客户端发送数据
  ws.send(JSON.stringify({
    id: 'success',
    data: 'connect success!'
  }))

  // 使用 on 方法监听事件
  ws.on('message', function (msg) {
    handleWsMeg(ws, JSON.parse(msg))
  })

  // close 事件表示客户端断开连接时执行的回调函数
  ws.on('close', function (e) {
    console.log('close connection')
  })
})

// 添加一个简单的路由用于测试
app.get('/', (req, res) => {
  res.send('Hello, Express with WebSocket!');
});

app.listen(3000, async () => {
  console.log('Service Start Success on port 3000!')
})
