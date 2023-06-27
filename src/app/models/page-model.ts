
export class PageModel {
    currentPage: number = 0;
    totalItems: number;
    pageSize: number = 5;
    sortColumn: string;
    sortDirection: string;
    public pageSizeOptions: number[] = [5, 10, 25, 50, 75, 100];


}