import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private resource: string[] = ['weimob', 'taobao', 'nineteen', 'excel'];

  getOrderResource(): string[] {
    return this.resource;
  }
}
