import { Injectable } from "@angular/core";

@Injectable ( {
  providedIn: 'root',
})

export class StorageService {

  set<T>(key: string, value: T): void {
    try {
      const serializedValue: string = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error: unknown) {
      console.error('Ошибка при сохранении в LocalStorage:', error);
    }
  }

get<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') as T | null;
  } catch (error: unknown) {
    console.error('Ошибка при чтении из LocalStorage:', error);
    return null;
  }
}

  remove (key: string): void {
    localStorage.removeItem(key)
  }

  clear (): void {
    localStorage.clear()
  }
}