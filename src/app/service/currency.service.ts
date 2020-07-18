import { Injectable } from '@angular/core';
import { MeeResult } from '../interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencyUrl: string;

  constructor(private http: HttpClient) {
    this.currencyUrl = environment.currencyUrl;
  }

  loadCurrency(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      this.getCurrency().subscribe((resuult: MeeResult) => {
        if (resuult.statusCode === 0) {
          const currency = resuult.data.rate;
          resolve(currency);
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  getCurrency() {
    return this.http.get(this.currencyUrl);
  }
}
