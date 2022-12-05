export interface Pagination{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number | null;
    totalPages: number | null;
}