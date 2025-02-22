import { GeoComponentOption } from "echarts";
import { MessageWrapModel } from "./messageWrapModel";
export class UserAddressDTO  extends MessageWrapModel {
    id:number;
    addrType: string;
    landMark: string;
    lineOne: string;
    lineTwo: string;
    geoCoordinates: GeoComponentOption;
    location: Location;
    userDetailId: number;
}
