import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MessageType } from '../../enums/Messege';
import { MessageService } from '../../app/services/message.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

public get appMessages() {
    return this.messageService.messages;
  }
  
  public closeToast(id: number) {
  this.messageService.closeMessage(id);
}
 constructor(private messageService: MessageService) {

 }
 

 
}


