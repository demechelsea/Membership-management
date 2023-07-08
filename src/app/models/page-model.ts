
export class PageModel {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
    sortColumn: string;
    sortDirection: string;
    public pageSizeOptions: number[] = [5, 10, 25, 50, 75, 100];
}