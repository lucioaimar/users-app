import { Observable } from 'rxjs';

export interface IGenericService<T> {
  GetList(filter: ListAsyncRequest ): Observable<ListAsyncResponse<T>>;
  Register(entity: T): Observable<T>;
  Update(entity: T): Observable<T>;
  GetSingle(id: number): Observable<SingleData<T>>;
  Delete(id: number): Observable<T>;
}

export interface ListAsyncRequest {
  page: number;
  per_page: number;
}

export interface ListAsyncResponse<T> {
  data: T[];
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
}

export interface SingleData<T> {
  data: T;
}

export interface FindByIdAsyncRequest
{
  id: number;
  empresaId: number;
  usuarioId: number;
  withFiles: boolean;
}

