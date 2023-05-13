
export default class LableValueModel {
  id: string;
  name: string;
  postCode: string;
  symbol: string;
  localName: string;

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name;
  }
}
