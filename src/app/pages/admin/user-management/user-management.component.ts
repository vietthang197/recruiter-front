import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {UserManagementService} from "./user-management.service";
import {UserInfoModel} from "../../../models/user_info.model";
import {RoleModel} from "../../../models/role.model";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {

  formSearch!: FormGroup;
  formCreate!: FormGroup;
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
  isConfirmLoading = false;
  listOfRole: readonly RoleModel[] = [];
  isSpinning = false;
  isSaving = false;

  constructor(private fb: FormBuilder, private modalService: NzModalService, private userManagementService: UserManagementService) {}

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 3 : true;
    });
  }

  resetForm(): void {
    this.formSearch.reset();
  }

  ngOnInit(): void {
    this.formSearch = this.fb.group({});
    for (let i = 0; i < 6; i++) {
      this.controlArray.push({ index: i, show: i < 3 });
      this.formSearch.addControl(`field${i}`, new FormControl());
    }

    this.formCreate = this.fb.group({
      username_insert: ['', [Validators.required]],
      role_insert: [[], [Validators.required]],
      password_insert: ['', [Validators.required]],
      email_insert: ['', [Validators.email, Validators.required]],
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
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
      this.isSaving = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
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
    let isConfirm = this.modalService.confirm({
      nzTitle: 'Bạn có muốn xoá dữ liệu này?',
      nzOkText: 'Đồng ý',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'Huỷ',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  loadingUserInfo() : void {
    this.userManagementService.getAllUserInfo().subscribe(
      (value: UserInfoModel[]) => {
        this.isSpinning = false;
        this.listOfData = value;
      },
      error => {
        this.isSpinning = false;
      },
    )
  }

  toListRoleName(roles: RoleModel[]) {
    return roles.map(item => item.name).join(",");
  }

  loadAllRole(): void {
    this.userManagementService.getAllRole().subscribe((data) => {
      this.listOfRole = data;
    })
  }
}
