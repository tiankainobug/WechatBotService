import {WechatyBuilder} from "wechaty";
import scheduleJob from "./schedule-job.js";

export function handleWsMeg(ws, msg, bot) {
    console.log('ws:', msg)
    // 登录
    if (msg.type === 'login') {
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
                data: user
            }))

        })
        bot.on('logout', (user) => {
            console.log(`用户 ${user} 退出了，开始重新登录！`)
            bot.start()
        })
        bot.start()
        .catch(async e => {
            console.error('Bot start() fail:', e)
            await bot.stop()
            process.exit(-1)
        })
    }
    // 开始定时任务
    if (msg.type === 'start') {
        console.log("设定定时任务成功！")
        scheduleJob.start(bot, msg.data)
    }
}