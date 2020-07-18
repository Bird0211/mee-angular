import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../pages/auth.service';
import { environment } from 'src/environments/environment';
import { MeeProduct, MeeResult } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class MeeProductService {

  productsSkuUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
      this.productsSkuUrl = environment.productsSkuUrl;
    }


    getProduct(skus: string[]): Promise<Map<string, MeeProduct>> {
      const promise = new Promise<Map<string, MeeProduct>>((resolve, reject) => {
        this.postProduct(skus).subscribe((result: MeeResult) => {
          if (result.statusCode === 0) {
            resolve(result.data);
          } else {
            reject();
          }
        });
      });
      return promise;
    }

    postProduct(skus: string[]) {
      const url = this.productsSkuUrl + '/' + this.authService.getBizId();
      return this.http.post(url, skus);
    }
}
