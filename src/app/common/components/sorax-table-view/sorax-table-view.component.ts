import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageModel } from 'app/models/page-model';
import { SoraxColumnDefinition } from './sorax-column-definition';
import MemershipPlanModel from 'app/models/membership-plan-model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'sorax-table-view',
  templateUrl: './sorax-table-view.component.html',
  styleUrls: ['./sorax-table-view.component.scss'],
  animations: [
    trigger('smoothFadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', [
        animate('1s ease-in')
      ])
    ])
  ]
})
export class SoraxTableViewComponent implements OnInit {
  currentRow: any;
  tooltipText: string;
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: SoraxColumnDefinition[];
  @Input() page: PageModel;

  @Output() sortEvent: EventEmitter<Sort> = new EventEmitter();
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() { }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: SoraxColumnDefinition) => tableColumn.dataKey);
    this.displayedColumns = columnNames;
  }


  getCellClass(position: String) {
    return position == 'right' ? "header-align-right" : "header-align-left";
  }

  formatedValue(rowData: any, columnDefs: SoraxColumnDefinition) {
    if (columnDefs.dataType == "Date") {
      return rowData[columnDefs.dataKey];
    }
    return rowData[columnDefs.dataKey];
}


  

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  emitSortEvent(sortParameters: Sort) {
    this.sortEvent.emit(sortParameters);
  }

  emitPageEvent(pageEvent: PageEvent) {
    this.pageEvent.emit(pageEvent);
  }

  emitRowAction(row: any, selectedAction: String) {
    row.performAction = selectedAction;
    this.rowAction.emit(row);
  }

  getTooltipText(row: any): string {
    // Use the data in the row object to generate the text for the tooltip
    return `Plan Name: ${row.planName}<br>
    Description: ${row.description}<br>
    Fee: ${row.fee}<br>
    Interval: ${row.interval}<br>
    Status: ${row.status};<br>
    Active subscription: ${row.activeSubscriptions};<br>
    UpdatedOn: ${row.modifiedTimestamp};<br>
    UpdatedBy: ${row.modifiedUser}`;
  }


  tooltipTop = 0;
  tooltipLeft = 0;

  updateTooltipPosition(event: MouseEvent, row: any) {
    this.tooltipTop = event.clientY;
    this.tooltipLeft = event.clientX + 20;
    this.tooltipText = this.getTooltipText(row);
  }

  showToolstip = false;

  hideTooltip() {
    this.tooltipText = '';
    this.showToolstip = false;
  }

  showTooltip() {
    this.showToolstip = true;
  }






}
