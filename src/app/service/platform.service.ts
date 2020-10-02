import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../pages/auth.service';
import { environment } from 'src/environments/environment';
import { MeeResult, PlatFormDetail, PlatFormInfo } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  platFormUrl: string;

  platFormDetailUrl: string;

  platFormDelUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService
    ) {
      this.platFormUrl = environment.platFormUrl;
      this.platFormDetailUrl = environment.platFormDetailUrl;
      this.platFormDelUrl = environment.platFormDelUrl;
    }


  loadPlatFormInfo(code: string): Promise<PlatFormInfo[]> {
    const promise = new Promise<PlatFormInfo[]>((resolve, reject) => {
      this.getPlatFormInfo(code).subscribe((result: MeeResult) => {
        if (result.statusCode === 0 && result.data.length > 0) {
          resolve(result.data);
        } else {
          reject();
        }
      });
    });

    return promise;
  }

  private getPlatFormInfo(code: string) {
    const url = this.platFormUrl + '/' + this.authService.getBizId() + '/' + code;
    return this.http.get(url);
  }

  public delPlatForm(id: number): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.del(id).subscribe((result: MeeResult) => {
        if (result.statusCode === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    return promise;
  }

  private del(id: number) {
    const url = this.platFormDelUrl + '/' + id;
    return this.http.delete(url);
  }

  loadPlatFormDetail(code: string): Promise<PlatFormDetail[]> {
    const promise = new Promise<PlatFormDetail[]>((resolve, reject) => {
      this.getPlatFormDetail(code).subscribe((result: MeeResult) => {
        if (result.statusCode === 0 && result.data.length > 0) {
          resolve(result.data);
        } else {
          reject();
        }
      });
    });

    return promise;
  }

  private getPlatFormDetail(code: string) {
    const url = this.platFormDetailUrl + '/' + this.authService.getBizId() + '/' + code;
    return this.http.get(url);
  }

}
