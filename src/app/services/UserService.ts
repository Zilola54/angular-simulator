import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserApiService } from '../services/user-api.service'; // Корректный путь к твоему API-сервису
import { LoaderService } from '../services/loader.service'; // Корректный путь к твоему лоадер-сервису
import { MessageService } from '../services/message.service'; // Корректный путь к твоему месседж-сервису

// Опишем структуру пользователя (интерфейс), чтобы TypeScript не ругался
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Главный интерфейс пользователя, который объединяет всё вместе
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address; // Вложенный объект адреса
  company: Company; // Вложенный объект компании
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Внедряем зависимости через современный inject
  private userApiService = inject(UserApiService);
  private loaderService = inject(LoaderService);
  private messageService = inject(MessageService);

  // 1. Приватный сабджект для хранения списка пользователей (начальное значение — пустой массив [])
  private usersSubject$ = new BehaviorSubject<User[]>([]);

  // 2. Публичный обсервабл для компонента, позволяющий получать значения из потока
  public users$: Observable<User[]> = this.usersSubject$.asObservable();

  constructor() {}

  // Метод для установки новых значений в поток (setUsers)
  setUsers(users: User[]): void {
    this.usersSubject$.next(users);
  }

  // Метод для получения текущего значения (getUsers)
  getUsers(): User[] {
    return this.usersSubject$.getValue();
  }

  // Главный метод загрузки пользователей с бэкенда (loadUsers)
  loadUsers(): Observable<User[]> {
    // Включаем спиннер в самую первую миллисекунду перед запросом
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      // Обработка ошибок
      catchError((error) => {
        // Вызываем уведомление пользователя через MessageService
         this.messageService.showError('Ошибка!', 'Не удалось загрузить пользователей'); 
        // Возвращаем безопасный пустой массив в виде нового потока через of()
        return of([]);
      }),
      // Финал запроса (сработает всегда — и при успехе, и при ошибке)
      finalize(() => {
        // Выключаем и скрываем наш глобальный спиннер
        this.loaderService.hideLoader();
      })
    );
  }
}