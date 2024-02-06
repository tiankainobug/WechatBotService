import schedule from 'node-schedule'
import {FileBox} from 'file-box'

export let scheduleList = []
export let dataList = []
export let topic = ''

async function start(bot, data) {
    return new Promise((resolve, reject) => {
        try {
            for (let dataItem of data.dataList) {
                console.log("定时任务时间节点：", dataItem.time)
                const scheduleItem = schedule.scheduleJob(dataItem.time, async () => {
                    const weiba = await bot.Room.find({topic: data.topic})
                    if (dataItem.imgUrl){
                        const fileBox = FileBox.fromUrl(dataItem.imgUrl)
                        weiba.say(fileBox)
                    }
                    weiba.say(dataItem.text)
                    console.log("定时任务发送成功！", JSON.stringify(dataItem))

                    // 发送成功后，通过文件传输助手，给自己一个回执。
                    const success = await bot.Room.find({topic: '微信助手'})
                    setTimeout(() => {
                        success.say("主人，定时任务已成功发送！消息如下：")
                    }, 1000)
                    setTimeout(() => {
                        success.say(`发送内容: ${dataItem.text}`)
                    }, 2000)
                    setTimeout(() => {
                        if (dataItem.imgUrl){
                            const fileBox = FileBox.fromUrl(dataItem.imgUrl)
                            success.say(fileBox)
                        }
                    }, 3000)
                    setTimeout(() => {
                        success.say(`发送时间：${dataItem.time}`)
                    }, 4000)
                })
                dataList.push(dataItem)
                scheduleList.push(scheduleItem)
            }
            topic = data.topic
            resolve(true)
        } catch (e) {
            resolve(false)
        }
    })
}

function stop() {
    return new Promise((resolve, reject) => {
        try {
            for (const item of scheduleList) {
                item.cancel()
            }
            scheduleList = []
            dataList = []
            resolve(true)
        } catch (e) {
            reject(false)
        }

    })
}

export default {
    start,stop
}
