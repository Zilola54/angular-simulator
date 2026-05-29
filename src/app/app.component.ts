import { Component } from '@angular/core';
import { Colors } from '../enums/Color';

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
