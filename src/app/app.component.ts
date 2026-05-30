import { Component } from '@angular/core';
import { Colors } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ'; 

  constructor() {
    this.saveLastVisitDate();
    this.updateVisitCount();
  } 

  checkColor(RGB: Colors): boolean {
    return RGB === Colors.GREEN || RGB === Colors.RED || RGB === Colors.BLUE;
  }
 
  saveLastVisitDate() {
    localStorage.setItem('lastVisit', new Date().toLocaleString());
  }

  updateVisitCount() {
    
    let currentVisits = localStorage.getItem('visitCount');
    let newCount = 0;
  
    if (currentVisits === null) {
      newCount = 1;
    } else {
      newCount = Number(currentVisits) + 1;
    }
    localStorage.setItem('visitCount', newCount.toLocaleString());
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