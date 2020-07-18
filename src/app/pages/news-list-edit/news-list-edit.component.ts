import { Component, OnInit } from '@angular/core';
import { NewsInfo, pageNewsInfo } from 'src/app/interface';
import { NewsService } from '../news/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list-edit',
  templateUrl: './news-list-edit.component.html',
  styleUrls: ['./news-list-edit.component.less']
})
export class NewsListEditComponent implements OnInit {

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
    this.router.navigate(['news/edit', value.id]);
  }

  add() {
    this.router.navigate(['news/edit', 0]);
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
