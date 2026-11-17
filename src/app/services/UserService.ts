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
  private readonly userApiService: UserApiService = inject(UserApiService);

  private readonly loaderService: LoaderService = inject(LoaderService);

  private readonly messageService: MessageService = inject(MessageService);

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly USERS_KEY: string = 'users';
  
  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  
  public readonly users$: Observable<User[]> = this.usersSubject$.asObservable();

  constructor(private http: HttpClient) {}
  
  public setUsers(users: User[]): void {
    this.usersSubject$.next(users);
    this.localStorageService.setItem<User[]>(this.USERS_KEY, users);
  }

  public getUsers(): User[] {
    return this.usersSubject$.getValue();
  }

  public loadUsers(): Observable<User[]> {
    const cachedUsers: User[] | null = this.localStorageService.getItem<User[]>(this.USERS_KEY);
    
    if (cachedUsers && cachedUsers.length > 0) {
      return of(cachedUsers);
    } 
    
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users: User[]): void => {
        this.localStorageService.setItem<User[]>(this.USERS_KEY, users);
      }),
      catchError((_error: unknown): Observable<User[]> => {
        this.messageService.showError('Ошибка!', 'Не удалось загрузить пользователей'); 
        return of([]);
      }),
      finalize((): void => {
        this.loaderService.hideLoader();
      })
    );
  }
  public deleteUser(userId: number): Observable<void> {
    return this.userApiService.deleteUser(userId);
  }
}