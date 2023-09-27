import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SidebarDataService {
  constructor() { }

  public sideNavBarSubject = new BehaviorSubject(null);
  public sideNavBar = this.sideNavBarSubject.asObservable();

}
