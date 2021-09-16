import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListAsyncRequest, ListAsyncResponse, SingleData, IGenericService } from 'src/app/interfaces/IGenericService.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../entitites/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IGenericService<User>{

  constructor(
    private http: HttpClient
  ) { }

  GetList(filter?: ListAsyncRequest): Observable<ListAsyncResponse<User>> {
    // tslint:disable-next-line: max-line-length
    let params = new HttpParams();
    if (filter){
      params = params.set('page', filter.page.toString());
      params = params.set('per_page', filter.per_page.toString());
    }
    return this.http.get<ListAsyncResponse<User>>(`${environment.api_user}/users`, { params: params });
  }

  Register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api_user}/users`, user);
  }

  Update(user: User): Observable<User> {
    return this.http.put<User>(`${environment.api_user}/users`, user);
  }

  Delete(id: number): Observable<User> {
    return this.http.delete<User>(`${environment.api_user}/users/${id}`);
  }

  GetSingle(id: number): Observable<SingleData<User>> {
    return this.http.get<SingleData<User>>(`${environment.api_user}/users/${id}`);
  }
}
