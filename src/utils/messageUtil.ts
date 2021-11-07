import { message } from 'antd'
export const buyItemMessage = (res: string, name: string, errorCallback: () => void) => {
    if (res === "抢购成功") {
        message.success(`成功抢到${name}`);
    }
    else if (res === "您已经买过了") {
        message.error(`您已经买过${name}了`)
    }
    else if (res === "运气不好，已经被抢光了") {
        message.error(`运气不好，${name}已经被抢光了`)
    }
    else if (res === "购买数量超过个人单品上限，已为您自动抢购了剩余商品") {
        message.warn(`购买${name}超过个人单品上限，已为您自动抢购了剩余商品`)
    }
    else if (res === "库存不足，以为您抢到了最大数量") {
        message.warn(`${name}库存不足，以为您抢到了最大数量`)
    }
    else if (res === "该抢购不存在或者不在抢购时间内") {
        message.error("该抢购不存在或者不在抢购时间内")
    }
    else {
        message.error("服务器错误")
        errorCallback();
    }
}