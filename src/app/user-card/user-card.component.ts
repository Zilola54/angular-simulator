import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { IUsers } from '../../interfaces/IUsers';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})

export class UserCardComponent {
 @Input({ required: true }) user!: IUsers
 @Output() delete = new EventEmitter<number>();

  remove() {
    this.delete.emit(this.user.id);
  }
}
