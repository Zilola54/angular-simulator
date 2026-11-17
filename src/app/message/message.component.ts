import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { IMessages } from '../../interfaces/IMessages'; 
import { MessageService } from '../../app/services/message.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  private readonly messageService: MessageService = inject(MessageService);

  public readonly messages$: Observable<IMessages[]> = this.messageService.messages$;

  public closeToast(id: number): void {
    this.messageService.closeMessage(id);
  }
}

