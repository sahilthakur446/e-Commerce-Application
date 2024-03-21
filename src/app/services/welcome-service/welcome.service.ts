import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private showWelcome$ = new BehaviorSubject<boolean>(false);
  constructor() { }
  setShowWelcome(value:boolean){
    this.showWelcome$.next(value);
  }

  getShowWelcome(){
    return this.showWelcome$;
  }
}
