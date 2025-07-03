import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor() { }
  // This method is used by the directive when navigating
  changenavigationPath(module: string, subModule: string, subSubModule: string): void {
    // You can store or log the navigation path as needed
    console.log('Navigation changed:', { module, subModule, subSubModule });
  }
}
