import { ActivityModel } from "./activity"
import { ItemModel } from "./itemModel"

export interface BoughtModel {
    quantity: number,
    activiry: ActivityModel,
    item: ItemModel,
    time: string,
}