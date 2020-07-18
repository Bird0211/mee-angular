import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeeResult, YiYunUser } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  queryAllUserUrl: string;

  yiyunUsers: YiYunUser[];

  constructor(private http: HttpClient) {
    this.queryAllUserUrl = environment.allUserUrl;
  }


  public loadUsers(bizId: number): Promise<YiYunUser[]> {
    const promise = new Promise<YiYunUser[]>((resolve, reject) => {
      if (this.yiyunUsers && this.yiyunUsers.length > 0) {
        resolve(this.yiyunUsers);
      } else {
        this.getUser(bizId).subscribe((meeResult: MeeResult) => {
          if (meeResult.statusCode === 0) {
            resolve(meeResult.data);
          } else {
            reject();
          }
        });
      }
    });

    return promise;
  }

  private getUser(bizId: number) {
    const url = this.queryAllUserUrl + '/' + bizId;
    return this.http.get(url);
  }
}
