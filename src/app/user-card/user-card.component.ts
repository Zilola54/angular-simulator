import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { IUsers } from '../../interfaces/IUsers';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})

export class UserCardComponent {
  @Input({ required: true }) public user!: IUsers
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();

  remove(): void {
    this.delete.emit(this.user.id);
  }
}
