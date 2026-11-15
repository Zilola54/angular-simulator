import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/UserService';
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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

  private userService = inject(UserService);

  public users$ = this.userService.users$;

  private searchSubject$ = new BehaviorSubject<string>('');

 
  public filteredUsers$: Observable<User[]> = combineLatest([
    this.users$,
    this.searchSubject$.asObservable()
  ]).pipe(
    map(([users, query]) => {
      if (!query) {
        return users;
      }
      return users.filter((user) => 
        user.name.toLowerCase().includes(query)
      );
    })
  );

  onSearch(query: string): void {
    this.searchSubject$.next(query);
  }

  onUserCreate(newUser: User): void {
    this.users$.pipe(take(1)).subscribe ((currentUsers: User[]) => {
      const updatedUsers = [newUser, ...currentUsers];
      this.userService.setUsers(updatedUsers);
    });
  }
  ngOnInit(): void {
    this.userService.loadUsers().subscribe((users) => {
      this.userService.setUsers(users);
    });
  }
  onDeleteUser(userId: number): void {
    this.users$.pipe(take(1)).subscribe((currentUsers: User[]) => {
      const updatedUsers = currentUsers.filter((user: User) => user.id !== userId);
      this.userService.setUsers(updatedUsers); 
    });
    this.userService.deleteUser(userId).subscribe({
      error: (err) => console.error('Ошибка при удалении пользователя:', err)
    });
  }
}
