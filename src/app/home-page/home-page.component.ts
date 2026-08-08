import { Component, inject } from '@angular/core';
import { IAdvantages } from '../../interfaces/IAdvantages';
import { IVouchers } from '../../interfaces/IVouchers';
import { IArticles } from '../../interfaces/IArticles';
import { IPhotos } from '../../interfaces/IPhotos';
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

    public companyName: string = 'РУМТИБЕТ'; 

    public selectedLocation: string = '';

  public selectedDate: string = '';

  public selectedParticipants: string = '';
  
    public advantages: IAdvantages[] = [
      {
        id: 1,
        title: 'Опытный гид',
        icon: 'images/guide-icon.svg',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
          {
        id: 2,
        title: 'Безопасный поход',
        icon: 'images/safety-icon.svg',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
          {
        id: 3,
        title: 'Лояльные цены',
        icon: 'images/price-icon.svg',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
    ];
  
    public vouchers: IVouchers[] = [
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
  
    public articles: IArticles[] = [
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
  
    public photos: IPhotos[] = [
      {
        id: 1,
        photo: 'balls-icon',
      },
      {
        id: 2,
        photo: 'camera-icon',
      },
      {
        id: 3,
        photo: 'skyscraper-icon',
      },
      {
        id: 4,
        photo: 'port-icon',
      },
      {
        id: 5,
        photo: 'grand-canyon-icon',
      },
      {
        id: 6,
        photo: 'book-icon',
      }
    ]


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
  private messageService = inject(MessageService);
}
