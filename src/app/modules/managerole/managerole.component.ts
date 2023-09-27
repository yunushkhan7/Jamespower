import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TreeviewConfig, TreeviewItem, TreeviewModule } from 'ngx-treeview';
import Swal from 'sweetalert2';
import { adminstrationServices } from '../../../zsoonServices/adminstration.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
    console.log('working');
  }
}

interface user {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-managerole',
  templateUrl: './managerole.component.html',
  styleUrls: ['./managerole.component.scss'],
})
export class ManageroleComponent implements OnInit {
  q: any;
  searchText;

  page = 1;
  pageno: any=5;
  RoleType = new FormControl('', [Validators.required]);

  RoleName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$'),
  ]);

  RoleDescription = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$'),
  ]);

  matcher = new MyErrorStateMatcher();

  roleobj;
  usertypeobj;
  usertypearr: any = [];
  rolearr: any = [];
  addrole = false;
  editrole = false;
  dropdownEnabled = true;
  roleMappings: any = [];
  items: TreeviewItem[];
  items1: TreeviewItem[];
  items3: TreeviewItem[];
  fullpermissions: any = [];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 250,
  });

  public roledata = {
    roleId: 0,
    roleDescription: '',
    roleName: '',
    modifiedBy: '',
    roleMappings: [],
    userTypeCode: '',
  };

  public editroledata = {
    roleId: 0,
    roleDescription: '',
    roleName: '',
    modifiedBy: '',
    roleMappings: [],
    userTypeCode: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private adminservice: adminstrationServices
  ) {}

  users: user[] = [
    { value: 'steak-0', viewValue: 'Admin' },
    { value: 'pizza-1', viewValue: 'Super Admin' },
    { value: 'tacos-2', viewValue: 'Testing' },
  ];

  ngOnInit(): void {
    this.products();
    this.items = [];
    this.items3 = [];
    this.getAllRoles();
    this.getAllUserTypes();
    this.getAllPermissions();
    //this.items = this.getBooks();

    this.spinner.show();

    setTimeout(() => {
      /* spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
  }

  getAllRoles() {
    this.adminservice.GetAllRoles().subscribe((data) => {
      console.log('role data', data);
      this.roleobj = data;
      this.rolearr = this.roleobj.roles;
      console.log(this.rolearr);
    });
  }

  getAllUserTypes() {
    this.adminservice.GetAllUsersTypes().subscribe((data) => {
      console.log('getallusertypes', data);
      this.usertypeobj = data;
      this.usertypearr = this.usertypeobj.userTypes;
      console.log(this.usertypearr);
    });
  }

  getAllPermissions() {
    this.adminservice.getAllPermissions().subscribe((data) => {
      console.log('getallpermission data', data);
    });
  }

  onChange(data) {
    this.pageno = data;
    console.log('pageno',data)
  }

  saveRole(data) {
    if (
      (data.roleName != '', data.userTypeCode != '', data.roleDescription != '')
    ) {
      // alert('i am working');
      console.log('return data', data);
      const datatosend = {
        roleDescription: data.roleDescription,
        roleName: data.roleName,
        createdBy: localStorage.getItem('userId'),
        roleMappings: this.roleMappings,
      };
      console.log('datatosend', datatosend);
      this.adminservice.InsertRole(datatosend).subscribe((data) => {
        console.log('data is success', data);
        if (data) {
          Swal.fire({
            title: 'Added',
            text: 'Role is saved successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
        }

        this.getAllRoles();
        this.addrole = false;
      });
    } else {
      this.RoleName.markAsTouched();
      this.RoleDescription.markAsTouched();
      this.RoleType.markAsTouched();
    }
 
  }

  updateRole(data) {
    console.log('updatedata', data);
    if (
      (data.roleName != '', data.userTypeCode != '', data.roleDescription != '')
    ) {
      const datatosend = {
        roleId: data.roleId,
        roleDescription: data.roleDescription,
        roleName: data.roleName,
        createdBy: localStorage.getItem('userId'),
        roleMappings: this.roleMappings,
        userTypeCode: data.userTypeCode,
      };
      console.log('datatosend', datatosend);

      this.adminservice.UpdateRole(datatosend).subscribe((data) => {
        console.log('res', data);
        if (data) {
          Swal.fire({
            title: 'Updated',
            text: 'Role is Updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff8084',
          });
        }

        this.editrole = false;
      });
    }
  }

  deleteRole(roleId) {
    console.log('deleted roleid', roleId);
    const datadelete = {
      roleId: roleId,
    };
    console.log('datadeleted', datadelete);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#13c9ca',
      cancelButtonColor: '#ff8084',
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.value) {
        this.adminservice.DeleteRole(datadelete).subscribe((success) => {
          this.getAllRoles();
          if (success) {
            Swal.fire('Deleted', 'Role has been deleted', 'success');
          }
        });
      }
    });
  }

  public products() {
    // this.submitted=false;
    this.adminservice.getAllPermissions().subscribe((data) => {
      this.fullpermissions = data;
      //console.log('datapass',this.data)
      this.fullpermissions.forEach((x) => {
        const y = x;
        console.log(y);
        const childrenNodes = [];
        x.permissions.forEach((q) => {
          const r = q;
          const childNodes = new TreeviewItem({
            text: r.permissionName,
            value: r.permissionId,
            checked: r.status,
          });
          console.log('childrenNodes', childrenNodes);
          childrenNodes.push(childNodes);
          childNodes.checked = false;
        });
        const parentNode = new TreeviewItem({
          text: y.nodeName,
          value: y.nodeId,
          checked: y.status,
          children: childrenNodes,
        });
        parentNode.checked = false;
        parentNode.collapsed = true;
        console.log('parentodes', parentNode);
        this.items.push(parentNode);
        //console.log(this.items)
      });
    });
  }

  public onSelectedChange(permissiondata) {
    console.log('oncheckclick', permissiondata);
    const permissionIds = [];
    permissiondata.forEach((id) => {
      const pid = {
        permissionId: id,
      };
      permissionIds.push(pid);
    });
    this.roleMappings = permissionIds;
    console.log('roleappingdata', this.roleMappings);
  }

  AddRole() {
    this.RoleName.markAsUntouched();
    this.RoleDescription.markAsUntouched();
    this.RoleType.markAsUntouched();

    this.roledata = {
      roleId: 0,
      roleDescription: '',
      roleName: '',
      modifiedBy: '',
      roleMappings: [],
      userTypeCode: '',
    };

    this.addrole = true;
    this.editrole = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    this.RoleName.reset();
    this.RoleDescription.reset();
    this.RoleType.reset();
  }
  permissiondata;
  arr: any = [];

  EditRole(role) {
    console.log('check', role);
    this.editroledata = role;
    console.log('final data', this.updateRole);

    this.items3 = [];
    //this.items=[];
    this.editrole = true;
    this.addrole = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    const dataid = {
      roleId: role.roleId,
    };

    this.adminservice.getRoleById(dataid).subscribe((data) => {
      console.log(data, 'fv/.,,mlkdjflk');

      this.permissiondata = data;
      //console.log("permissindata",this.permissiondata)
      this.arr = this.permissiondata.roledata.parentNodes;
      console.log('ushouldcomenow', this.arr);
      this.arr.forEach((x) => {
        const y = x;
        console.log(y);
        const childrenNodes = [];
        x.permissions.forEach((q) => {
          const r = q;
          const childNodes = new TreeviewItem({
            text: r.permissionName,
            value: r.permissionId,
            checked: r.isChecked,
          });
          console.log('childrenNodes', childrenNodes);
          childrenNodes.push(childNodes);
        });
        const parentNode = new TreeviewItem({
          text: y.nodeName,
          value: y.nodeId,
          checked: y.status,
          children: childrenNodes,
        });

        parentNode.collapsed = true;
        console.log('parentodes', parentNode);
        this.items3.push(parentNode);
        //console.log(this.items)
      });
    });
  }

  Cancel() {
    this.addrole = false;
    this.editrole = false;
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
