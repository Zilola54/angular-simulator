import { CommonModule } from '@angular/common';
import { UserService } from '../services/UserService';
import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  // 1. Внедряем UserService
  private userService = inject(UserService);

  // 2. Достаем публичный поток пользователей для шаблона
  public users$ = this.userService.users$;

  ngOnInit(): void {
    // 3. Запускаем загрузку пользователей при старте компонента. 
    // Метод loadUsers() возвращает Observable, на который нужно подписаться, 
    // чтобы Angular совершил HTTP-запрос!
    this.userService.loadUsers().subscribe((users) => {
      console.log('ДАННЫЕ ИЗ СЕТИ ПРИШЛИ:', users);
      // Сохраняем полученных пользователей в поток нашего сервиса
      this.userService.setUsers(users);
    });
  }
}
