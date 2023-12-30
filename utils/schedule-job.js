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
        } catch (err) {
            console.log('错误：\n', err)
        }
    })
  }
}

export default {
  start
}