import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './UserService';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  private http = inject(HttpClient);
  
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor() {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}