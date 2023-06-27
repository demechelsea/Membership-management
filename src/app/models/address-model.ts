import { MessageWrapModel } from './messageWrapModel';

export class AddressModel extends MessageWrapModel {
	id: bigint;
	encryptedId: number;
	landMark: string;
	lineOne: string;
	lineTwo: string;
	lineThree: string;
	city: string;
	state: string;
	country: string;
	postCode: string;

}
