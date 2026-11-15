import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, catchError, finalize  } from 'rxjs';
import { UserApiService } from '../services/user-api.service'; 
import { LoaderService } from '../services/loader.service';
import { MessageService } from '../services/message.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';

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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiService = inject(UserApiService);

  private loaderService = inject(LoaderService);

  private messageService = inject(MessageService);

  private usersSubject$ = new BehaviorSubject<User[]>([]);

  private localStorageService = inject(LocalStorageService);

  private readonly USERS_KEY = 'users';
  
  public users$: Observable<User[]> = this.usersSubject$.asObservable();

  constructor(private http: HttpClient) {}
  
  setUsers(users: User[]): void {
    this.usersSubject$.next(users);

    this.localStorageService.setItem(this.USERS_KEY, users);
  }

  getUsers(): User[] {
    return this.usersSubject$.getValue();
  }

  loadUsers(): Observable<User[]> {
    
    const cachedUsers = this.localStorageService.getItem(this.USERS_KEY);
    
    if (cachedUsers && cachedUsers.length > 0) {
    return of(cachedUsers);
    } 
    
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users) => {
        this.localStorageService.setItem(this.USERS_KEY, users);
      }),

      catchError((error) => {
        this.messageService.showError('Ошибка!', 'Не удалось загрузить пользователей'); 
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
  deleteUser(userId: number): Observable<any> {
    return this.userApiService.deleteUser(userId);
  }
}