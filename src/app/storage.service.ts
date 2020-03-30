import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  set(data: any, key: string = 'wire-transfers-data'): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Ошибка записи', e);
    }
  }

  get(key: string = 'wire-transfers-data'): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Ошибка чтения', e);
      return null;
    }
  }
}
