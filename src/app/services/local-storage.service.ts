import { Injectable } from '@angular/core';

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  get localStorage(): Storage {
    return getLocalStorage();
  }
}
