import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeeResult, pageNewsInfo } from 'src/app/interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsListUrl: string;

  constructor(private http: HttpClient) {

    this.newsListUrl = environment.newsListUrl;
  }

  loadNews(pageIndex: number, pageSize: number): Promise<pageNewsInfo> {
    console.log('LoadNews Service');
    const promise = new Promise<pageNewsInfo>((resolve, reject) => {
      this.postNews(pageIndex, pageSize).subscribe((result: MeeResult) => {
        console.log(result);
        if (result.statusCode === 0) {
          resolve(result.data);
        } else {
          reject();
        }
      });

    });
    return promise;
  }

  postNews(pageIndex: number, pageSize: number) {
    const param = {pageSize, pageIndex};
    return this.http.post(this.newsListUrl, param);
  }

}
