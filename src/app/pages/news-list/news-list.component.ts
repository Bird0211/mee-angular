import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news/news.service';
import { pageNewsInfo, NewsInfo } from 'src/app/interface';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less']
})
export class NewsListComponent implements OnInit {

  pageIndex = 1;

  pageSize = 20;

  total = 0;

  news: NewsInfo[];

  selectedNews: NewsInfo;

  isVisible = false;

  constructor(private newsService: NewsService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.newsService.loadNews(this.pageIndex, this.pageSize).then((result: pageNewsInfo) => {
      this.total = result.total;
      // this.pageIndex = result.pageIndex;
      // this.pageSize = result.pageSize;
      this.news = result.news;
    });
  }

  show(value: NewsInfo) {
    this.router.navigate(['news', value.id]);
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  pageIndexChange(value: number) {
    this.loadNews();
  }

}
