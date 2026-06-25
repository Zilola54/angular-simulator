import { Injectable } from "@angular/core";

@Injectable ( {
  providedIn: 'root',
})

export class StorageService {

  public set <T>(key: string, value: T ): void {
    localStorage.setItem(key,JSON.stringify(value))
  }


  public get <T> (key: string): T | null {
    const data = localStorage.getItem(key);
    if ( data != null) {
      return JSON.parse(data)
    } else {
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