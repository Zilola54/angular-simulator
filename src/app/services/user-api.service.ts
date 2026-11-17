import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './UserService';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  private readonly http: HttpClient = inject(HttpClient);
  
  private readonly apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}