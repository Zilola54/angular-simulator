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
  private readonly messageService: MessageService = inject(MessageService);

  private timerId: ReturnType<typeof setInterval> | null = null;

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
  public currentDate: Date = new Date();

  ngOnInit(): void {
    this.startTimer();

    setTimeout((): void => {
      this.isLoading = false;
    }, 2000);
  }
  
  ngOnDestroy(): void {
    if (this.timerId !== null) {
    clearInterval(this.timerId);
    }
  }

  public startTimer(): void {
    this.timerId = setInterval((): void => {
      this.currentDate = new Date();
      }, 1000);
  }

  public toggleWidget(): void {
    this.isDateActive = !this.isDateActive;

    if (this.isDateActive) {
      this.startTimer();
    } else if (this.timerId !== null) {
    clearInterval(this.timerId);
    }
  }

  public triggerMessage(text: string, typeString: 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR', desc: string): void {
      const type: MessageType = MessageType[typeString];
    if (type === MessageType.SUCCESS) {
      this.messageService.showSuccess(text, desc);
    } else if (type === MessageType.INFO) {
      this.messageService.showInfo(text, desc);
    } else if (type === MessageType.WARN) {
      this.messageService.showWarn(text, desc);
    } else if (type === MessageType.ERROR) {
      this.messageService.showError(text, desc);
    }
  }
}

