import { Component, inject } from '@angular/core';
import { IAdvantages } from '../../interfaces/IAdvantages';
import { IVouchers } from '../../interfaces/IVouchers';
import { IArticles } from '../../interfaces/IArticles';
import { MessageType } from '../../enums/Messege';
import { MessageService } from '../../app/services/message.service';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly messageService: MessageService = inject(MessageService);

  companyName: string = 'РУМТИБЕТ'; 

  selectedLocation: string = '';

  selectedDate: string = '';

  selectedParticipants: string = '';
  
  advantages: IAdvantages[] = [
    {
      id: 1,
      title: 'Опытный гид',
      icon: 'guide-icon',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
        {
      id: 2,
      title: 'Безопасный поход',
      icon: 'safety-icon',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
        {
      id: 3,
      title: 'Лояльные цены',
      icon: 'price-icon',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
  ];
  
  vouchers: IVouchers[] = [
    {
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      photo: 'mountain-lakes-icon',
      descriptionBackground: 'descriptionBackground-icon',
      ratingPhoto: 'star-icon',
    },
    {
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: 480,
      rating: 4.5,
      photo: 'night-mountains-icon',
      descriptionBackground:'descriptionBackground-icon',
      ratingPhoto: 'star-icon',
    },
    {
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто заботится о себе',
      price: 230,
      rating: 5.0,
      photo: 'mountain-yoga-icon',
      descriptionBackground: 'descriptionBackground-icon',
      ratingPhoto: 'star-icon',
    },
  ];
  
  articles: IArticles[] = [
    {
      icon: 'italia-icon',
      title: 'Красивая Италия, какая она в реальности ?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      btnOfRead: 'читать статью',
    },
    {
      icon: 'airplane-icon',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      btnOfRead:'читать статью',
    },
    {
      icon: 'street-icon',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      btnOfRead:'читать статью',
    },
    {
      icon: 'india-icon',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      btnOfRead:'читать статью',
    },
  ]

  photos: string[] = [
    'balls-icon',
    'camera-icon',
    'skyscraper-icon',
    'port-icon',
    'grand-canyon-icon',
    'book-icon',
  ];

  triggerMessage(text: string, typeString: 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR', desc: string): void {
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
