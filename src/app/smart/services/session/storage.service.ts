import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }
  isLogged(): PromiseLike <boolean> {
    if ( typeof(Storage) !== 'undefined' ) {
      if( sessionStorage.getItem('Session.User')) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }



}
