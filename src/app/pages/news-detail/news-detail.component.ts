import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsInfo } from 'src/app/interface';
import { NewsService } from '../news/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.less']
})
export class NewsDetailComponent implements OnInit {

  newsInfo: NewsInfo;

  spinning = true;


  constructor(private route: ActivatedRoute,
              private newsService: NewsService
    ) {
  }

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');
    console.log('NewsId', newsId);
    const id = newsId;
    console.log('id', id);
    if (id !== '0') {
      this.loadNews(id);
    }
  }

  loadNews(id: string) {
    this.newsService.loadNewsDetail(id).then((result: NewsInfo) => {
      this.newsInfo = result;
      this.spinning = false;
    });
  }


}
