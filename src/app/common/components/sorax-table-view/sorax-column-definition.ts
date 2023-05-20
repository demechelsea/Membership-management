 export class  SoraxColumnDefinition {
    name: string; // column name
    dataKey: string; // name of key of the actual data in this column
    link?:boolean;
    position?: 'right' | 'left'; // should it be right-aligned or left-aligned?
    isSortable?: boolean; // can a column be sorted?
    dataType?:string;
    clickEvent?: (data: any, boolean) => void;
  }