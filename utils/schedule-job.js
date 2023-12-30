import schedule from 'node-schedule'
import { FileBox } from 'file-box'

async function start(bot, data) {
  for (let dataItem of data.dataList) {
    schedule.scheduleJob(dataItem.time, async () => {
        try {
            const fileBox = FileBox.fromUrl(dataItem.imgUrl)
            const weiba = await bot.Room.find({topic: data.topic})
            weiba.say(fileBox)
            weiba.say(dataItem.text)

            // 发送成功后，通过文件传输助手，给自己一个回执。
            const success = await bot.Room.find({topic: '微信助手'})
            success.say("主人，定时任务已成功发送！消息如下：")
            success.say(fileBox)
            success.say(dataItem.text)
        } catch (err) {
            console.log('错误：\n', err)
        }
    })
  }
}

export default {
  start
}