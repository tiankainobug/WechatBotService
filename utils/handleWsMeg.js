import {WechatyBuilder} from "wechaty";
import scheduleJob, {dataList, scheduleList, topic} from "./schedule-job.js";

let bot = null

export function handleWsMeg(ws, msg) {
    console.log('ws:', msg)
    // 登录
    if (msg.type === 'login') {
        new Promise((resolve, reject) => {
            bot = WechatyBuilder.build({
                name: msg.name
            })
            resolve(true)
        }).then(() => {
            bot.on('scan', (qrcode, status) => {
                ws.send(
                    JSON.stringify({
                        id: 'login',
                        data: qrcode
                    })
                )
            })
            bot.on('login', (user) => {
                console.log(`用户 ${user} 登录成功`)
                ws.send(JSON.stringify({
                    id: 'loginSuccess',
                    user: user,
                    data: dataList,
                    topic: topic
                }))

            })
            bot.on('logout', (user) => {
                console.log(`用户 ${user} 退出了！`)
            })
            bot.start()
            .catch(async e => {
                console.error('Bot start() fail:', e)
                await bot.stop()
                process.exit(-1)
            })
        })
    }
    // 开始定时任务
    if (msg.type === 'start') {
        scheduleJob.start(bot, msg.data).then(success => {
            if (success) {
                console.log("设定定时任务成功！")
                ws.send(JSON.stringify({
                    id: 'startSuccess',
                    data: msg.data
                }))
            }
        })
    }
    // 取消定时任务
    if (msg.type === 'stop') {
        scheduleJob.stop().then(success => {
            if (success) {
                console.log("取消定时任务成功！")
                ws.send(JSON.stringify({
                    id: 'stopSuccess',
                    data: '取消成功！'
                }))
            }
        })
    }
    // 退出微信
    if (msg.type === 'logout') {
        console.log("退出微信")
        scheduleJob.stop().then(success => {
            if (success) {
                console.log("取消定时任务成功！")
                ws.send(JSON.stringify({
                    id: 'stopSuccess',
                    data: '取消成功！'
                }))
            }
        })
        bot.logout().then(() => {
            ws.send(JSON.stringify({
                id: 'logout',
                data: '退出成功！'
            }))
        })
    }
}
