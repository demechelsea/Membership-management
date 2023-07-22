import { Component, OnInit, ViewChild } from "@angular/core";
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
import RoleAndPermissionDTO from "app/models/roleAndPermissionDTO";
import { NotificationService } from "app/common/services/notification.service";

@Component({
  selector: "app-policiesAndDocstore",
  templateUrl: "./visibilitySettings.component.html",
  styleUrls: ["./visibilitySettings.component.scss"],
  animations: SoraxAnimations,
})
export class VisibilitySettingsComponent
  extends BaseComponent
  implements OnInit
{
  private ngUnsubscribe$ = new Subject<void>();

  selectedRoleAndPermission: number;
  allRoles: RoleDTO[];
  allUserRoles: RoleDTO[];
  allPermissions: PermissionDTO[];
  allUserPermissions: PermissionDTO[];
  permission = false;
  role = false;
  isSuperAdmin: boolean;

  @ViewChild("superAdminCheckbox") superAdminCheckbox: MatCheckbox;

  resultViewModel: ResultViewModel = new ResultViewModel();
  memberoptionsKey: string = LookupService.MEMBER_OPTIONS;
  public visibilitySettingForm: FormGroup;

  permissionCheckboxes: MatCheckbox[];

  constructor(
    private formBuilder: FormBuilder,
    private roleAndPermissiontService: RoleAndPermissionService,
    private notificationService: NotificationService
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
        this.allUserPermissions = response.result.userPermissions;
        this.allUserRoles = response.result.userRoles;
        const superAdminRole = this.allRoles.find(
          (role) => role.name === "Super Admin"
        );
        if (superAdminRole) {
          superAdminRole.isSuperAdmin = true;
        }

        this.allUserRoles.forEach((userRole) => {
          const roleIndex = this.allRoles.findIndex(
            (role) => role.name === userRole.name
          );
          if (roleIndex !== -1) {
            this.allRoles[roleIndex].checked = true;
          }
        });

        this.allUserPermissions.forEach((userPermission) => {
          const permissionIndex = this.allPermissions.findIndex(
            (permission) =>
              permission.permissionName === userPermission.permissionName
          );
          if (permissionIndex !== -1) {
            this.allPermissions[permissionIndex].checked = true;
          }
        });

        const superAdminUserRole = this.allUserRoles.find(
          (role) => role.name === "Super Admin"
        );
        if (superAdminUserRole) {
          this.allPermissions.forEach(
            (permission) => (permission.checked = true)
          );
        }
      });
  }

  onSelectedMembersOption(option: any) {
    this.visibilitySettingForm.controls["member"].setValue(
      `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`
    );
    this.getRoleAndPermission(option.userDetail.id);
    this.selectedRoleAndPermission = option.userDetail.id;
    this.permission = true;
    this.role = true;
  }

  memberDisplayFn(option: any): string {
    return `${option.userDetail.firstName} ${option.userDetail.givenName} ${option.userDetail.parentName}`;
  }

  applyRoleAndPermission() {
    const roleAndPermissionDTO = new RoleAndPermissionDTO();
    const userDetail = new UserDetailDTO();
    userDetail.id = this.selectedRoleAndPermission;
    roleAndPermissionDTO.userDetail = userDetail;
    roleAndPermissionDTO.userRoles = this.allRoles.filter(
      (role) => role.checked
    );
    roleAndPermissionDTO.userPermissions = this.allPermissions.filter(
      (permission) => permission.checked
    );
    this.roleAndPermissiontService
      .updateRoleAndPermission(roleAndPermissionDTO)
      .subscribe((response) => {
        if (response.success) {
          this.notificationService.showSuccess(
            response.messages[0].message
          );
        } else {
          this.notificationService.showError(
            response.messages[0].message
          );
        }
      });
  }

  onRoleChange(role: RoleDTO) {
    // TODO: Implement logic for role change
  }

  onSuperAdminChange() {
    const superAdminRole = this.allRoles.find(
      (role) => role.name === "Super Admin"
    );
    if (superAdminRole) {
      const superAdminChecked = superAdminRole.checked;
      this.allPermissions.forEach(
        (permission) => (permission.checked = superAdminChecked)
      );
    }
  }
}
