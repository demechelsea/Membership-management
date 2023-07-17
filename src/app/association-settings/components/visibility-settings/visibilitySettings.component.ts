import { Component, OnInit } from "@angular/core";
import { SoraxAnimations } from "app/common/animations/sorax-animations";
import { BaseComponent } from "app/core/components/base/base.component";
import { ResultViewModel } from "app/models/result-view-model";
import { Subject, takeUntil } from "rxjs";
import { LookupService } from "app/common/services/lookup.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserDetailDTO } from "app/models/UserDetailDTO";
import { MatCheckbox } from "@angular/material/checkbox";
import { RoleAndPermissionService } from "app/association-settings/services/roleAndPermission/roleAndPermission.service";
import PermissionDTO from "app/models/permissionDTO";
import RoleDTO from "app/models/roleDTO";

@Component({
  selector: "app-policiesAndDocstore",
  templateUrl: "./visibilitySettings.component.html",
  styleUrls: ["./visibilitySettings.component.scss"],
  animations: SoraxAnimations,
})
export class VisibilitySettingsComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();

  selectedRoleAndPermission: number;
  allRoles: RoleDTO[];
  allPermissions: PermissionDTO[];
  permission = false;

  resultViewModel: ResultViewModel = new ResultViewModel();
  memberoptionsKey: string = LookupService.MEMBER_OPTIONS;
  public visibilitySettingForm: FormGroup;

  permissionCheckboxes: MatCheckbox[];

  constructor(
    private formBuilder: FormBuilder,
    private roleAndPermissiontService: RoleAndPermissionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildSMTPForm(new UserDetailDTO());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  buildSMTPForm(assocationSettingData: UserDetailDTO) {
    this.visibilitySettingForm = this.formBuilder.group({
      member: [assocationSettingData.firstName],
      superAdmin: [false],
    });
  }

  getRoleAndPermission(roleAndPermissionid: number) {
    this.roleAndPermissiontService
      .getRoleAndPermission(roleAndPermissionid)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        console.log(response);
        this.allRoles = response.result.allRoles;
        this.allPermissions = response.result.allPermissions;
      });
  }

  onSelectedMembersOption(option: any) {
    this.visibilitySettingForm.controls["member"].setValue(
      `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`
    );
    this.getRoleAndPermission(option.userDetail.id);
    this.selectedRoleAndPermission = option.userDetail.id;
    this.permission = true;
  }

  memberDisplayFn(option: any): string {
    return `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`;
  }

  applyRoleAndPermission() {
    this.roleAndPermissiontService
      .updateRoleAndPermission(this.selectedRoleAndPermission)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {});
  }

  onRoleChange(role: RoleDTO) {
    // TODO: Implement logic for role change
  }

  onSuperAdminChange() {
    const superAdminRoleName = 'Super Admin';
    const isSuperAdmin = this.allRoles.some(role => role.name === superAdminRoleName);

    if (this.visibilitySettingForm.controls.superAdmin.value && isSuperAdmin) {
      this.allPermissions.forEach(permission => permission.isSelected = true);
    } else {
      this.allPermissions.forEach(permission => permission.isSelected = false);
    }
  }
}