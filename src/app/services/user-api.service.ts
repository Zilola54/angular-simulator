import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from '../../interfaces/IUsers';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  private readonly http: HttpClient = inject(HttpClient);
  
  private readonly apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}