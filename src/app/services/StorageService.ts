import { Injectable } from "@angular/core";

@Injectable ( {
  providedIn: 'root',
})

export class StorageService {

  public set<T>(key: string, value: T): void {
    try {
      const serializedValue: string = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error: unknown) {
      console.error('Ошибка при сохранении в LocalStorage:', error);
    }
  }

  public get <T> (key: string): T | null {
    try {
      const data: string | null = localStorage.getItem(key);
      return data !== null ? (JSON.parse(data) as T) : null;
    } catch (error: unknown) {
      console.error('Ошибка при чтении из LocalStorage:', error);
      return null;
    }
  }

  public remove (key: string): void {
    localStorage.removeItem(key)
  }

  public clear (): void {
    localStorage.clear()
  }
}