import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './UserService'; // Импортируем интерфейс юзера

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  // Инжектируем стандартный HttpClient для работы с сетью
  private http = inject(HttpClient);
  
  // URL-адрес для запроса (обычно в ДЗ дают JSONPlaceholder)
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor() {}

  // Метод, который просто делает GET-запрос и возвращает «сырой» поток данных
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}