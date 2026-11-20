import { CommonModule, AsyncPipe } from '@angular/common';
import { UserService } from '../services/UserService';
import { IUsers } from '../../interfaces/IUsers'; 
import { Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { take, map, BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { UserCreateComponent } from '../components/user-create/user-create.component';
import { UsersFilterComponent } from '../components/users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AsyncPipe, CommonModule, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private readonly userService: UserService = inject(UserService);
  private readonly searchSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  public readonly users$: Observable<IUsers[]> = this.userService.users$;

  public readonly filteredUsers$: Observable<IUsers[]> = combineLatest([
    this.users$,
    this.searchSubject$.asObservable(),
  ]).pipe(
    map(([users, query]: [IUsers[], string]): IUsers[] => {
      if (!query) {
        return users;
      }
      return users.filter((user: IUsers): boolean => 
        user.name.toLowerCase().includes(query)
      );
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers().subscribe((users: IUsers[]): void => {
      this.userService.setUsers(users);
    });
  }

  public onSearch(query: string): void {
    this.searchSubject$.next(query);
  }

  public onUserCreate(newUser: IUsers): void {
    this.users$.pipe(take(1)).subscribe ((currentUsers: IUsers[]): void => {
      const updatedUsers: IUsers[] = [newUser, ...currentUsers];
      this.userService.setUsers(updatedUsers);
    });
  }
  
  public onDeleteUser(userId: number): void {
    this.users$.pipe(take(1)).subscribe((currentUsers: IUsers[]): void => {
      const updatedUsers: IUsers[] = currentUsers.filter(
        (user: IUsers): boolean => user.id !== userId
      );
      this.userService.setUsers(updatedUsers); 
    });

    this.userService.deleteUser(userId).subscribe({
      error: (err: unknown): void => console.error('Ошибка при удалении пользователя:', err),
    });
  }
}
