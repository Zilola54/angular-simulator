
import {RouterOutlet} from '@angular/router';
import { HeaderComponent } from './header/header.component'; // путь может немного отличаться в зависимости от вашей структуры папок
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { Component } from '@angular/core';
import { Colors } from '../enums/Color';
import { Collection } from './collection';
 
import { FormsModule } from '@angular/forms';

import { StorageService } from './services/StorageService'; 
import { CommonModule } from '@angular/common'; 
import { MessageComponent } from './message/message.component';



@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MessageComponent, LoaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {


public companyName: string = 'РУМТИБЕТ';

  public isDateActive: boolean = true;

  private timerId: any;
  
  public currentDate: Date = new Date();

  public counter: number = 0;

  public isLoading: boolean = true;

  public inputValue: string = '';

  

  constructor(private storageService: StorageService) {
    this.saveLastVisitDate();
    this.updateVisitCount();
  } 

  public checkColor(RGB: Colors): boolean {
    return RGB === Colors.GREEN || RGB === Colors.RED || RGB === Colors.BLUE;
  }
 
  public saveLastVisitDate() {
    this.storageService.set('lastVisit', new Date().toLocaleString());
  }

  public updateVisitCount() {
    
    let currentVisits = this.storageService.get<number>('visitCount');
    let newCount = 0;
  
    if (currentVisits === null) {
      newCount = 1;
    } else {
      newCount = currentVisits + 1;
    }
    this.storageService.set('visitCount', newCount);
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
