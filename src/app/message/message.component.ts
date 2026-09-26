import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { MessageType } from '../../enums/Messege';
import { IMessages } from '../../interfaces/IMessages'; 
import { MessageService } from '../../app/services/message.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  public messages$!: Observable<IMessages[]>;



  public closeToast(id: number) {
  this.messageService.closeMessage(id);
  }
 constructor(private messageService: MessageService) {}
 
  ngOnInit(): void {
    this.messages$ = this.messageService.messages$;
  }
}


