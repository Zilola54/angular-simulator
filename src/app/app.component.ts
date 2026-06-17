import './training';
import { Component } from '@angular/core';
import { Colors } from '../enums/Color';
import { Collection } from './collection';
import { IAdvantages } from '../interfaces/IAdvantages'; 
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IVouchers } from '../interfaces/IVouchers';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  public companyName: string = 'РУМТИБЕТ'; 

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

  public selectedLocation: string = '';

  public selectedDate: string = '';

  public selectedParticipants: string = '';

  public isDateActive: boolean = true;

  private timerId: any;
  
  public currentDate: Date = new Date();

  public counter: number = 0;

  public isLoading: boolean = true;

  public inputValue: string = '';
  

  constructor() {
    this.saveLastVisitDate();
    this.updateVisitCount();
  } 

  public checkColor(RGB: Colors): boolean {
    return RGB === Colors.GREEN || RGB === Colors.RED || RGB === Colors.BLUE;
  }
 
  public saveLastVisitDate() {
    localStorage.setItem('lastVisit', new Date().toLocaleString());
  }

  public updateVisitCount() {
    
    let currentVisits = localStorage.getItem('visitCount');
    let newCount = 0;
  
    if (currentVisits === null) {
      newCount = 1;
    } else {
      newCount = Number(currentVisits) + 1;
    }
    localStorage.setItem('visitCount', String(newCount));
  }

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

  ngOnInit() {
    this.startTimer();

    setTimeout(  () => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}

const mountainCollection = new Collection<string>(['Килиманджаров','Говерла', 'Монблан']);

console.log('все горы:', mountainCollection.getElements());

mountainCollection.deleteThisElements(1);
console.log('После удаления:', mountainCollection.getElements()); 

const priceCollection = new Collection<number>([1200, 2500, 3100]);

console.log('Все цены:', priceCollection.getElements()); 

priceCollection.replaseThisElements(0, 1500);
console.log('Обновленные цены:', priceCollection.getElements());
