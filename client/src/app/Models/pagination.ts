// Models/pagination.ts
export interface Metadata {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    count: number;
}

export class PaginatedResponse<T> {
    items: T;
    metadata: Metadata;

    constructor(items: T, pagination: any) {
        this.items = items;
        this.metadata = {
            currentPage: pagination.CurrentPage,
            totalPages: pagination.TotalPages,
            pageSize: pagination.PageSize,
            count: pagination.Count
        };
    }
}
