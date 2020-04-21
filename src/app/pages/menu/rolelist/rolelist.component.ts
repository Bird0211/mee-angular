import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NzMessageService, TransferItem } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MeeResult, Role, RoleMenu, YiYunUser, RoleUser } from 'src/app/interface';
import { th, ms } from 'date-fns/locale';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.less']
})
export class RolelistComponent implements OnInit, OnChanges {

  loading = true;
  isVisible = false;

  role: Role = {id: null, bizId: this.authService.getBizId(), roleName: null, roleType: 1};

  selectedRole: number;

  data: Role[];

  queryRoleUrl: string;
  queryRoleMenuUrl: string;

  queryAllUserUrl: string;
  queryRoleUserUrl: string;

  addRoleUrl: string;
  updateRoleMenuUrl: string;
  updateRoleUserUrl: string;

  @Input() bizId: string;

  @Input() isDisabledRoleType = false;

  selectedNodes: string[] = [];
  yiyunUsers: YiYunUser[] = [];
  allUsers: TransferItem[] = [];

  radioValue: number;
  isDisabled: false;


  constructor(
    private authService: AuthService,
    private msg: NzMessageService,
    private http: HttpClient
  ) {
    this.queryRoleUrl = environment.roleUrl;
    this.addRoleUrl = environment.addRoleUrl;
    this.queryRoleMenuUrl = environment.queryRoleMenuUrl;
    this.updateRoleMenuUrl = environment.updateRoleMenuUrl;
    this.queryAllUserUrl = environment.allUserUrl;
    this.queryRoleUserUrl = environment.roleUserUrl;
    this.updateRoleUserUrl = environment.updateRoleUserUrl;
  }

  ngOnInit(): void {
    if (!this.authService.getBizId()) {
        this.msg.error('请重新登录！');
    } else {
        this.bizId = this.authService.getBizId().toString();
        this.loadRole();
        this.loadUser();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bizId && changes.bizId.currentValue) {
      this.allUsers = [];
      this.selectedRole = null;
      this.radioValue = null;
      this.loadRole();
      this.loadUser();
    }
  }

  loadRole() {
    this.queryRole().subscribe((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        this.data = meeResult.data;
      }
      this.loading = false;
    });
  }

  loadUser() {
    this.getUser().subscribe((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        this.yiyunUsers = meeResult.data;
      }
    });
  }

  addRole() {
    this.isVisible = true;
    this.role = {id: 0, bizId: this.authService.getBizId(), roleName: '', roleType: 1};
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.postAddRole().subscribe((meeResult: MeeResult) => {
      if (meeResult.statusCode !== 0) {
        this.msg.error('添加失败！');
      } else {
        this.msg.success('添加成功！');
        this.role.id = meeResult.data.id;
        this.data = [... this.data, this.role];
        this.isVisible = false;
      }
    });
  }

  private postAddRole() {
    return this.http.post(this.addRoleUrl,
      {roleName: this.role.roleName, bizId: this.role.bizId, roleType: Number(this.role.roleType)});
  }

  queryRole() {
    const url = this.queryRoleUrl + '/' + this.bizId;
    return this.http.get(url);
  }


  selectRole(roleId: number) {
    this.selectedRole = roleId;
    this.loadMenuByRoleId(roleId).subscribe((meeResult: MeeResult) => {
      if (meeResult.statusCode === 0) {
        const data: RoleMenu[] = meeResult.data;
        this.selectedNodes = data.map(item => item.menuId.toString());
      }
    });

    this.loadUserByRoleId(roleId).subscribe((meeResutl: MeeResult) => {
      if (meeResutl.statusCode === 0) {
        const data: RoleUser[] = meeResutl.data;
        const userIds: string[] = data.map(item => item.userId.toString());
        this.setAllUser(userIds);
      }
    });
  }

  setAllUser(userIds: string[]) {
    this.allUsers = [];
    this.yiyunUsers.forEach(item => {
      this.allUsers = [...this.allUsers, {title: item.givenName + ' ' + item.surname,
          key: item.userId,
          direction: userIds.includes(item.userId.toString()) ? 'right' : 'left'}];
    });

  }


  saveRoleMenu() {
    if (!this.selectedRole) {
      this.msg.warning('请选择角色！');
    } else {
      this.postRoleMenu().subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          this.msg.success('保存成功！');
        } else {
          this.msg.error('保存失败！');
        }
      });
    }

  }

  saveRoleUser() {
    const roleId = this.selectedRole;
    if (!roleId) {
      this.msg.warning('请选择角色！');
    } else {
      this.postRoleUser().subscribe((meeResult: MeeResult) => {
        if (meeResult.statusCode === 0) {
          this.msg.success('保存成功！');
        } else {
          this.msg.error('保存失败！');
        }
      });
    }

  }

  loadMenuByRoleId(roleId: number) {
    const url = this.queryRoleMenuUrl + '/' + roleId;
    return this.http.get(url);
  }

  loadUserByRoleId(roleId: number) {
    const url = this.queryRoleUserUrl + '/' + roleId;
    return this.http.get(url);
  }

  postRoleMenu() {
    const url = this.updateRoleMenuUrl;
    const data = {roleId: this.selectedRole, menuIds: this.selectedNodes};
    return this.http.post(url, data);
  }

  getUser() {
    const url = this.queryAllUserUrl + '/' + this.bizId;
    return this.http.get(url);
  }

  postRoleUser() {
    const url = this.updateRoleUserUrl;
    const selectUserIds = this.allUsers.filter(item => item.direction === 'right').map(item => item.key);
    const data = { roleId: this.selectedRole, userIds: selectUserIds };
    return this.http.post(url, data);
  }
}
