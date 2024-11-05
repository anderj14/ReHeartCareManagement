export interface PaginationParams {
    pageIndex: number;
    pageSize: number;
    sort: string;
}

export function getAxiosParams(paginationParams: PaginationParams): URLSearchParams {
    const params = new URLSearchParams();
    params.append("pageIndex", paginationParams.pageIndex.toString());
    params.append("pageSize", paginationParams.pageSize.toString());
    params.append("sort", paginationParams.sort.toString());
    return params;
  }