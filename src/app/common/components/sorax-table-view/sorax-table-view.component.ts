import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageModel } from 'app/models/page-model';
import { SoraxColumnDefinition } from './sorax-column-definition';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

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

  tooltipText: string;
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;


  @Input() serverSidePagination = false;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: SoraxColumnDefinition[];
  @Input() page: PageModel;
  @Input() tableType: string;

  @Output() sortEvent: EventEmitter<Sort> = new EventEmitter();
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() showToPublicToggleChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor(private dialog: MatDialog,) {
   }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: SoraxColumnDefinition) => tableColumn.dataKey);
    this.displayedColumns = columnNames;
    console.log();
    
  }

  convertToBoolean(str: string): boolean {
    return str === "Y" ? true : false;
  }
  

  getCellClass(position: String) {
    return position == 'right' ? "header-align-right" : "header-align-left";
  }

  onShowToPublicToggleChange(row: any) {
    this.showToPublicToggleChange.emit(row);
  }

  formatedValue(rowData: any, columnDefs: SoraxColumnDefinition) {
    if (columnDefs.dataKey === 'endDate' && rowData.status === 'Active' && this.tableType === 'committee') {
      return '-';
    }
    if (columnDefs.dataType == "Date") {
      const date = new Date(rowData[columnDefs.dataKey]);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    return rowData[columnDefs.dataKey];
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    if (!this.serverSidePagination) {
      this.tableDataSource.paginator = this.matPaginator;
      this.tableDataSource.sort = this.matSort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!this.serverSidePagination) {
      this.tableDataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  emitSortEvent(sortParameters: Sort) {
    if (this.serverSidePagination) {
      this.sortEvent.emit(sortParameters);
    }
  }

  emitPageEvent(pageEvent: PageEvent) {
    if (this.serverSidePagination) {
      this.pageEvent.emit(pageEvent);
    }
  }

  emitRowAction(row: any, selectedAction: String) {
    row.performAction = selectedAction;
    if (selectedAction === 'view') {
      this.viewEvent.emit(row);
    }
    if (selectedAction === 'edit') {
      this.editEvent.emit(row);
    }
    if (selectedAction === 'delete') {
      this.deleteEvent.emit(row);
    }

    this.rowAction.emit(row);
  }


  getTooltipText(row: any): string {
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
