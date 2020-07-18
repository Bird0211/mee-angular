import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeeResult, pageNewsInfo, NewsInfo } from 'src/app/interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsListUrl: string;

  newsDetailUrl: string;


  constructor(private http: HttpClient) {
    this.newsListUrl = environment.newsListUrl;
    this.newsDetailUrl = environment.newsDetailUrl;
  }

  loadNews(pageIndex: number, pageSize: number): Promise<pageNewsInfo> {
    const promise = new Promise<pageNewsInfo>((resolve, reject) => {
      this.postNews(pageIndex, pageSize).subscribe((result: MeeResult) => {
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

  loadNewsDetail(id: string): Promise<NewsInfo> {
    const promise = new Promise<NewsInfo>((resolve, reject) => {
      this.getNewsDetail(id).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          resolve(result.data);
        } else {
          reject();
        }
      });

    });
    return promise;
  }

  getNewsDetail(id: string) {
    const url = this.newsDetailUrl + '/' + id;
    return this.http.get(url);
  }

}
