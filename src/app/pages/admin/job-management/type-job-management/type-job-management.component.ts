import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfoModel} from "../../../../models/user_info.model";
import {RoleModel} from "../../../../models/role.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {UserManagementService} from "../../user-management/user-management.service";
import {BaseResponseModel} from "../../../../models/base_response.model";
import {SearchUserInfoModel} from "../../../../models/search/search_userinfo_model";
import {BasePagingResponseModel} from "../../../../models/base_paging_response_model";

@Component({
  selector: 'app-type-job-management',
  templateUrl: './type-job-management.component.html',
  styleUrls: ['./type-job-management.component.scss']
})
export class TypeJobManagementComponent implements OnInit {

  formSearch!: FormGroup;
  formCreate!: FormGroup;
  formEdit!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly UserInfoModel[] = [];
  listOfCurrentPageData: readonly UserInfoModel[] = [];
  setOfCheckedId = new Set<number>();
  passwordVisible = false;
  password?: string;
  isVisible = false;
  isVisibleEdit = false;
  isConfirmLoading = false;
  listOfRole: readonly RoleModel[] = [];
  isSpinning = false;
  isSaving = false;
  //pagination
  totalData:number = 0;
  pageIndex:number = 1;
  pageSize:number = 10;

  constructor(private fb: FormBuilder, private modalService: NzModalService, private userManagementService: UserManagementService) {}

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 3 : true;
    });
  }

  resetFormSearch(): void {
    this.formSearch.reset();
  }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      username_search: [null, []],
      email_search: [null, []]
    });

    this.formCreate = this.fb.group({
      username: ['', [Validators.required]],
      roles: [[], [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
    });

    this.formEdit = this.fb.group({
      username: ['', [Validators.required]],
      roles: [[], [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      id: [null, []]
    });

    this.isSpinning = true;
    this.loadingUserInfo();
  }

  showModal1(): void {
    this.loadAllRole();
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.isSaving = true;

    // do save userInfo
    this.userManagementService.adminCreateUser(this.formCreate.value).subscribe((next) => {
      if (next.status == 200) {
        this.modalService.success({
          nzTitle: 'Thông báo',
          nzContent: 'Thêm mới người dùng thành công',
          nzOkText: 'OK'
        });
        this.isVisible = false;
        this.formCreate.reset();
        this.loadingUserInfo();
      } else {
        this.modalService.error({
          nzTitle: 'Thông báo',
          nzContent: next.message,
          nzOkText: 'OK'
        });
      }
    }, (error) => {
      this.modalService.error({
        nzTitle: 'Thông báo',
        nzContent: 'Đã có lỗi xảy ra, vui lòng thử lại',
        nzOkText: 'OK'
      });
    }, () => {
      this.isSaving = false;
      this.isConfirmLoading = false;
    })
  }

  handleCancel(): void {
    this.isVisible = false;
    this.formCreate.reset();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data['id']));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  submitForm() {

  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly UserInfoModel[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  showDeleteConfirm(): void {
    console.log({
      listId: [...this.setOfCheckedId.values()]
    })
    this.modalService.confirm({
      nzTitle: `Bạn có muốn xoá ${this.setOfCheckedId.size} dữ liệu này?`,
      nzOkText: 'Đồng ý',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.userManagementService.adminDeleteUser({
          listId: [...this.setOfCheckedId.values()]
        }).subscribe((response: BaseResponseModel<Object>) => {
          if (200 == response.status) {
            this.setOfCheckedId.clear();
            this.refreshCheckedStatus();
            this.modalService.success({
              nzTitle: 'Thông báo',
              nzContent: 'Xoá thành công',
              nzOkText: 'OK'
            });
            this.loadingUserInfo();
          } else {
            this.modalService.error({
              nzTitle: 'Thông báo',
              nzContent: 'Xoá thất bại',
              nzOkText: 'OK'
            });
          }
        }, (error) => {
          this.modalService.error({
            nzTitle: 'Thông báo',
            nzContent: 'Có lỗi xảy ra, vui lòng thử lại',
            nzOkText: 'OK'
          });
        });
      },
      nzCancelText: 'Huỷ',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  loadingUserInfo() : void {
    let query: SearchUserInfoModel = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      username: this.isEmpty(this.formSearch.controls['username_search'].value) ? null : this.formSearch.controls['username_search'].value,
      email: this.isEmpty(this.formSearch.controls['email_search'].value) ? null : this.formSearch.controls['email_search'].value,
    }
    this.userManagementService.getAllUserInfo(query).subscribe(
      (value: BasePagingResponseModel<UserInfoModel>) => {
        this.isSpinning = false;
        this.listOfData = value.data?.data? value.data.data : [];
        this.totalData = value.data?.total? value.data.total : 0;
      },
      error => {
        console.log(error)
        this.isSpinning = false;
      },
    )
  }

  isEmpty(str:string) {
    return (!str || str.length === 0 );
  }

  toListRoleName(roles: RoleModel[]) {
    return roles.map(item => item.name).join(",");
  }

  loadAllRole(): void {
    this.userManagementService.getAllRole().subscribe((data) => {
      this.listOfRole = data;
    })
  }

  loadAllRoleAndFill(roles: RoleModel[]): void {
    this.userManagementService.getAllRole().subscribe((data) => {
      this.listOfRole = data;
      this.formEdit.controls['roles'].setValue(roles.map(item => item.id));
    })
  }

  changePageIndex($event: number) {
    this.pageIndex = $event.valueOf();
    this.loadingUserInfo();
  }

  changePageSize($event: number) {
    this.pageSize = $event.valueOf();
    console.log('pageSize', this.pageSize)
    this.loadingUserInfo();
  }

  showModal2(data: UserInfoModel) {
    this.loadAllRoleAndFill(data.roles);
    this.formEdit.controls['username'].setValue(data.username);
    this.formEdit.controls['email'].setValue(data.email);
    this.formEdit.controls['phone'].setValue(data.phone);
    this.formEdit.controls['fullName'].setValue(data.fullName);
    this.formEdit.controls['id'].setValue(data.id);
    this.formEdit.controls['username'].disable();
    this.isVisibleEdit = true;
  }

  handleCancelEdit() {
    this.isVisibleEdit = false;
    this.formEdit.reset();
  }

  handleOkEdit() {
    this.isConfirmLoading = true;
    this.isSaving = true;

    // do update userInfo
    this.userManagementService.adminEditUser(this.formEdit.getRawValue()).subscribe((next) => {
      if (next.status == 200) {
        this.modalService.success({
          nzTitle: 'Thông báo',
          nzContent: 'Sửa người dùng thành công',
          nzOkText: 'OK'
        });
        this.isVisibleEdit = false;
        this.formEdit.reset();
        this.loadingUserInfo();
      } else {
        this.modalService.error({
          nzTitle: 'Thông báo',
          nzContent: next.message,
          nzOkText: 'OK'
        });
      }
    }, (error) => {
      this.modalService.error({
        nzTitle: 'Thông báo',
        nzContent: 'Đã có lỗi xảy ra, vui lòng thử lại',
        nzOkText: 'OK'
      });
    }, () => {
      this.isSaving = false;
      this.isConfirmLoading = false;
    })
  }

}
