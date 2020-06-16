import { Component, OnInit } from '@angular/core';
import { News, NewsIO, MeeResult, pageNewsInfo, NewsInfo } from 'src/app/interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  news: News[] = [];

  newsInfo: NewsInfo[] = [];

  newsUrl: string;

  selectedNews: News;

  isVisible = false;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private newsService: NewsService
    ) {
    this.newsUrl = environment.newsUrl;
  }

  ngOnInit(): void {
    // this.loadNews();
    this.loadYiyunNews();
  }


  loadYiyunNews() {
    this.newsService.loadNews(1, 5).then((result: pageNewsInfo) => {
      this.newsInfo = result.news;
    });
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

  more() {
    this.router.navigate(['news/list']);
  }

  show(value: NewsInfo) {
    this.router.navigate(['news', value.id]);
  }

}
