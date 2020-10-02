import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { News, NewsInfo, MeeResult } from 'src/app/interface';
import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news/news.service';

@Component({
  selector: 'app-news-editer',
  templateUrl: './news-editer.component.html',
  styleUrls: ['./news-editer.component.less']
})
export class NewsEditerComponent implements OnInit {

  content: string;

  title: string;

  newsType = 0;

  id: string;

  newsAddUrl: string;

  newsUpdateUrl: string;

  loading = false;

  constructor(private message: NzMessageService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private newsService: NewsService
    ) {
      this.newsAddUrl = environment.newsAddUrl;
      this.newsUpdateUrl = environment.newsUpdateUrl;
    }

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');
    this.id = newsId;
    if (this.id !== '0') {
      this.loadNews(this.id);
    }
  }

  loadNews(id: string) {
    this.newsService.loadNewsDetail(id).then((result: NewsInfo) => {
      this.title = result.title;
      this.content = result.content;
      this.newsType = result.type;
    });
  }

  submit() {
    if (!this.title) {
      this.message.error('请输入标题！');
      return;
    }

    if (!this.content) {
      this.message.error('请输入内容！');
      return;
    }

    this.loading = true;
    if (this.id === '0') {
      this.addNews();
    } else {
      this.updateNews();
    }

  }

  updateNews() {
    const url = this.newsUpdateUrl;

    this.postNews(url).subscribe((result: MeeResult) => {
      this.loading = false;
      if (result.statusCode === 0) {
        this.message.success('更新成功！');
        this.router.navigate(['news/edit']);
      } else {
        this.message.error('更新失败！');
      }
    });
  }

  addNews() {
    const url = this.newsAddUrl;
    this.postNews(url).subscribe((result: MeeResult) => {
      this.loading = false;
      if (result.statusCode === 0) {
        this.message.success('添加成功！');
        this.router.navigate(['news/list']);
      } else {
        this.message.error('添加失败！');
      }
    });
  }

  postNews(url: string) {
    const body: NewsInfo = {
              id: this.id === '0' ? null : this.id,
              title: this.title,
              content: this.content,
              type: this.newsType,
              updateDate: null
            };

    return this.http.post(url, body);
  }

}
