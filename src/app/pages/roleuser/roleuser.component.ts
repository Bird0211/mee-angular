import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-roleuser',
  templateUrl: './roleuser.component.html',
  styleUrls: ['./roleuser.component.less']
})
export class RoleuserComponent implements OnInit {

  selectBiz: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.selectBiz = this.authService.getBizId().toString();
  }


}
