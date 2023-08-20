import { MessageWrapModel } from './messageWrapModel';

export default class CouponDTO extends MessageWrapModel {
    id:number;
    name: string;
    code: string;
    discount: string;
    discountType: string;
    expiryDate: string;
    maxRedemption: number;
    status: string;
    autoGenerateCoupon: boolean;
}
