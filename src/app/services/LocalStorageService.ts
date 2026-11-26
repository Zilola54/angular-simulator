import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setItem<T> (key: string, value: T ): void {
    try {
      const stringValue: string = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error: unknown) {
      console.error('Ошибка записи в LocalStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const value: string | null = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T ) : null;
    } catch (error: unknown) {
      console.error('Ошибка чтения из LocalStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
