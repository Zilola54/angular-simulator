import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, catchError, finalize  } from 'rxjs';
import { UserApiService } from '../services/user-api.service'; 
import { LoaderService } from '../services/loader.service';
import { MessageService } from '../services/message.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './LocalStorageService';
import { IUsers } from '../../interfaces/IUsers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userApiService: UserApiService = inject(UserApiService);

  private readonly loaderService: LoaderService = inject(LoaderService);

  private readonly messageService: MessageService = inject(MessageService);

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly USERS_KEY: string = 'users';
  
  private readonly usersSubject$ = new BehaviorSubject<IUsers[]>([]);
  
  public readonly users$: Observable<IUsers[]> = this.usersSubject$.asObservable();

  constructor(private http: HttpClient) {}
  
  public setUsers(users: IUsers[]): void {
    this.usersSubject$.next(users);
    this.localStorageService.setItem<IUsers[]>(this.USERS_KEY, users);
  }

  public getUsers(): IUsers[] {
    return this.usersSubject$.getValue();
  }

  public loadUsers(): Observable<IUsers[]> {
    const cachedUsers: IUsers[] | null = this.localStorageService.getItem<IUsers[]>(this.USERS_KEY);
    
    if (cachedUsers && cachedUsers.length > 0) {
      return of(cachedUsers);
    } 
    
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users: IUsers[]): void => {
        this.localStorageService.setItem<IUsers[]>(this.USERS_KEY, users);
      }),
      catchError((_error: unknown): Observable<IUsers[]> => {
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