export class SoraxColumnDefinition {
  name: string;
  dataKey: string;
  link?: boolean;
  position?: 'right' | 'left';
  isSortable?: boolean;
  dataType?: string;
  clickEvent?: (data: any, boolean) => void;
  cellTemplate?: any; // Add this line to add the cellTemplate property
}
