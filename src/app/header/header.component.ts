import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from '../../app/services/message.service';
import { MessageType } from '../../enums/Messege';
import { ImenuItems } from '../../interfaces/ImenuItems';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, DatePipe],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

public menuItems: ImenuItems[] = [
  {
    title: 'Главная',
    url: '/',
    isExact: true,
  },
  {
    title: 'Пользователи',
    url: '/users',
    isExact: false,
  }
]

  public companyName: string = 'РУМТИБЕТ';

  public isDateActive: boolean = true;

  public counter: number = 0;

  public isLoading: boolean = true;

  private timerId: any;

  public currentDate: Date = new Date();



    public startTimer() {
    this.timerId = setInterval(() => {
      this.currentDate = new Date();
      }, 1000);
  }

  public toggleWidget() {
    this.isDateActive = !this.isDateActive;

    if (this.isDateActive) {
    this.startTimer();
    } else {
    clearInterval(this.timerId);
    }
  }

  public triggerMessage(text: string, typeString: 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR', desc: string) {
      const type = MessageType[typeString];
    if (typeString === 'SUCCESS') {
      this.messageService.showSuccess(text, desc);
    } else if (typeString === 'INFO') {
      this.messageService.showInfo(text, desc);
    } else if (typeString === 'WARN') {
      this.messageService.showWarn(text, desc);
    } else if (typeString === 'ERROR') {
      this.messageService.showError(text, desc);
    }
  }
  
    ngOnInit() {
      this.startTimer();
  
      setTimeout(  () => {
        this.isLoading = false;
      }, 2000);
    }
  
    ngOnDestroy() {
      clearInterval(this.timerId);
    }

  private messageService = inject(MessageService);
}

