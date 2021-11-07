import { ActivityModel } from "./activity"
import { ItemModel } from "./itemModel"
import { UserModel } from "./user"

export interface BoughtModel {
    quantity: number,
    activiry: ActivityModel,
    item: ItemModel,
    user: UserModel,
    time: string,
}