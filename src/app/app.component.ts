import {RouterOutlet} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { Component, OnDestroy, OnInit, inject  } from '@angular/core';
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

export class AppComponent implements OnInit, OnDestroy {
private readonly storageService: StorageService = inject(StorageService);
private timerId: ReturnType<typeof setInterval> | null = null;

companyName: string = 'РУМТИБЕТ';

isDateActive: boolean = true;

currentDate: Date = new Date();

counter: number = 0;

isLoading: boolean = true;

inputValue: string = '';

ngOnInit(): void {
  this.saveLastVisitDate();
  this.updateVisitCount();
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
  
checkColor(RGB: Colors): boolean {
  return RGB === Colors.GREEN || RGB === Colors.RED || RGB === Colors.BLUE;
}
 
saveLastVisitDate(): void {
  this.storageService.set<string>('lastVisit', new Date().toLocaleString());
}

updateVisitCount(): void {
  const currentVisits: number | null  = this.storageService.get<number>('visitCount');
  const newCount: number = currentVisits === null ? 1 : currentVisits + 1;

  this.storageService.set<number>('visitCount', newCount);
}

  startTimer(): void {
    this.timerId = setInterval((): void => {
      this.currentDate = new Date();
    }, 1000);
  }

  toggleWidget(): void {
    this.isDateActive = !this.isDateActive;

    if (this.isDateActive) {
      this.startTimer();
    } else if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }
}
const mountainCollection: Collection<string> = new Collection<string>(['Килиманджаров','Говерла', 'Монблан']);

console.log('все горы:', mountainCollection.getElements());

mountainCollection.deleteThisElements(1);
console.log('После удаления:', mountainCollection.getElements()); 

const priceCollection: Collection<number> = new Collection<number>([1200, 2500, 3100]);
console.log('Все цены:', priceCollection.getElements()); 

priceCollection.replaseThisElements(0, 1500);
console.log('Обновленные цены:', priceCollection.getElements());