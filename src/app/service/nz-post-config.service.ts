import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subscriber } from 'rxjs';
import { NzPostConfig, MeeResult, ShippedOptionService, ShippedOptionReq, LabelStatusResult } from '../interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NzPostConfigService {

  nzPostConfigUrl: string;

  nzPostAddUrl: string;

  nzPostEditUrl: string;

  nzPostDelUrl: string;

  shippedoptionUrl: string;

  labelstatusUrl: string;


  constructor(private http: HttpClient) {
    this.nzPostConfigUrl = environment.nzPostConfigListUrl;
    this.nzPostAddUrl = environment.nzPostAddUrl;
    this.nzPostEditUrl = environment.nzPostEditUrl;
    this.nzPostDelUrl = environment.nzPostDelUrl;
    this.shippedoptionUrl = environment.shippedoptionUrl;
    this.labelstatusUrl = environment.nzPostStatusUrl;
  }

  loadNzConfig(bizId: number): Observable<NzPostConfig[]> {
    const result = new Observable<NzPostConfig[]>((observable: Subscriber<NzPostConfig[]>) => {
      this.getNzConfig(bizId).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error();
        }
      }, observable.error, observable.complete );
    });
    return result;
  }

  private getNzConfig(bizId: number) {
    const url = this.nzPostConfigUrl + '/' + bizId;
    return this.http.get(url);
  }

  addNzConfig(entity: NzPostConfig): Observable<boolean> {
    const result = new Observable<boolean>((observable: Subscriber<boolean>) => {
      this.postAddNzConfig(entity).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(true);
        } else {
          observable.next(false);
        }
      }, observable.error, observable.complete);
    });

    return result;
  }

  updateNzConfig(entity: NzPostConfig): Observable<boolean> {
    const result = new Observable<boolean>((observable: Subscriber<boolean>) => {
      this.postEditNzConfig(entity).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(true);
        } else {
          observable.next(false);
        }
      }, observable.error, observable.complete);
    });

    return result;
  }

  delateNzConfig(id: number): Observable<boolean> {
    const result = new Observable<boolean>((observable: Subscriber<boolean>) => {
      this.delNzConfig(id).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(true);
        } else {
          observable.next(false);
        }
      }, observable.error, observable.complete);
    });

    return result;
  }

  getShippedOption(entity: ShippedOptionReq): Observable<ShippedOptionService[]> {
    const result = new Observable<ShippedOptionService[]>((observable: Subscriber<ShippedOptionService[]>) => {
      this.postShippedOp(entity).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error(meeResult.statusCode);
        }
      }, observable.error, observable.complete);
    });

    return result;
  }

  labelStatus(consignmentIds: string[]): Observable<LabelStatusResult[]> {
    const result = new Observable<LabelStatusResult[]>((observable: Subscriber<LabelStatusResult[]>) => {
      this.postLabelStatus(consignmentIds).subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          observable.next(meeResult.data);
        } else {
          observable.error(meeResult.statusCode);
        }
      }, observable.error, observable.complete);
    });

    return result;
  }

  private postShippedOp(entity: ShippedOptionReq) {
    const url = this.shippedoptionUrl;
    return this.http.post(url, entity);
  }

  private postAddNzConfig(entity: NzPostConfig) {
    const url = this.nzPostAddUrl;
    return this.http.post(url, entity);
  }

  private postEditNzConfig(entity: NzPostConfig) {
    const url = this.nzPostEditUrl;
    return this.http.post(url, entity);
  }

  private delNzConfig(id: number) {
    const url = this.nzPostDelUrl + '/' + id;
    return this.http.delete(url);
  }

  private postLabelStatus(consignmentIds: string[]) {
    const url = this.labelstatusUrl;
    return this.http.post(url, consignmentIds);
  }


}
