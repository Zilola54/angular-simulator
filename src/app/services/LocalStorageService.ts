import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
   constructor() {}

   setItem(key: string, value: any): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Ошибка записи в LocalStorage:', error);
    }
  }

  getItem(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Ошибка чтения из LocalStorage:', error);
      return null;
    }
  }

   removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
