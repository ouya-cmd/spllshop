import { request } from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class Shop {
    constructor(shopInfo) {
        this.name = shopInfo.name
        this.logo = shopInfo.shopLogo
        this.cSells = shopInfo.cSells
        this.cGoods = shopInfo.cGoods
        this.url = shopInfo.shopUrl
        this.score = shopInfo.score
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // images可能没有值
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })
}