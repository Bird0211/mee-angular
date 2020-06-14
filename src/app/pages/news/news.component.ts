import { Component, OnInit } from '@angular/core';
import { News, NewsIO, MeeResult } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  news: News[] = [];

  newsUrl: string;

  selectedNews: News;

  isVisible = false;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
    this.newsUrl = environment.newsUrl;
  }

  ngOnInit(): void {
    this.loadNews();

  }

  loadNews() {
    this.getNzNews().subscribe((result: MeeResult) => {
      if (result.statusCode === 0) {
        result.data.forEach(item => {
          this.news.push({
            title: item.title,
            type: 0,
            id: null,
            overView: item.content
          });
        });
      }
    });
  }

  getNzNews() {
    const url = this.newsUrl + '/' + this.authService.getBizId();
    return this.http.get(url);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

}
