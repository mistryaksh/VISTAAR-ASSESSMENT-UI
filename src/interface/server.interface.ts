export interface ITableResponseProps<T> {
     page: number;
     limit: number;
     total: number;
     totalPages: number;
     length: number;
     data: T[];
}
