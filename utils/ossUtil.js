import OSS from 'ali-oss'
import {v4} from 'uuid'

export async function ossService(file) {

    // 配置阿里云 OSS 客户端
    const client = new OSS({
        accessKeyId: 'LTAI5tADSNp74AppJtH8RahF',
        accessKeySecret: 'P3lo25iR7TOZzOPWYMKRTYCC8wjyQw',
        region: 'oss-cn-beijing',
        bucket: 'guli-1227',
    });

    // 获取当前日期 用来文件按日期分类
    const nowDate = new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }); // 将斜杠替换为横线，以符合格式要求
    // 获取后缀名
    const extension = file.originalname.split('.').pop();
    const uniqueId = v4();
    // 获取文件名
    const fileName = `${nowDate}/${uniqueId}.${extension}`;

    // 上传文件到阿里云 OSS
    return await client.put(fileName, file.path)
}
