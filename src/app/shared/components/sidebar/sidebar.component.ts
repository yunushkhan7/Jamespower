import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Menu, NavService } from 'src/zsoonServices/nav.service';
import { SidebarDataService } from 'src/zsoonServices/sidebar-data.service';
import { loginServices } from '../../../../zsoonServices/loginservices';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  public menuItems: Menu[];
  itemsList: any = []

  MENUITEMS: Menu[] =
    [
      {
        "nodeName": "Administration",
        "type": "sub",
        "nodeIcon": "fa fa-user",
        "permissions": [

          {
            "permissionName": "Data fields",
            "path": "/data-fields",
            "type": "link"
          },
          {
            "permissionName": "Locations",
            "path": "/location",
            "type": "link"
          },
          {
            "permissionName": "Visit Schedules",
            "path": "/visit-schedules",
            "type": "link"
          },
          {
            "permissionName": "Reserved Day",
            "path": "/reserved-days",
            "type": "link"
          },

        ]
      },

      {
        "nodeName": "Users",
        "type": "sub",
        "nodeIcon": "fa fa-user-plus",
        "permissions": [
          {
            "permissionName": "Manage Users",
            "path": "/manageuser",
            "type": "link"
          },
        ]
      },

      {
        "nodeName": "Devices",
        "type": "sub",
        "nodeIcon": "fa fa-users",
        "permissions": [
          {
            "permissionName": "Doors",
            "path": "/doors",
            "type": "link"
          },
          {
            "permissionName": "Eithernet I/O",
            "path": "/ethernet",
            "type": "link"
          },
          {
            "permissionName": "QR Readers",
            "path": "/qr-readers",
            "type": "link"
          },
        ]
      },

      {
        "nodeName": "Settings",
        "type": "sub",
        "nodeIcon": "fa fa-cogs",
        "permissions": [

          {
            "permissionName": "Data Retention",
            "path": "/smtp",
            "type": "link"
          },
          {
            "permissionName": "SMTP",
            "path": "/smtp",
            "type": "link"
          },
          {
            "permissionName": "QR Codes",
            "path": "/qr-codes",
            "type": "link"
          },

        ]
      },

      {
        "nodeName": "Reports",
        "type": "sub",
        "nodeIcon": "fa fa-flag",
        "permissions": [
          {
            "permissionName": "Visit Access Logs",
            "path": "/visitor-log",
            "type": "link"
          },
          {
            "permissionName": "Visit Access Request",
            "path": "/visitor-request",
            "type": "link"
          },
          {
            "permissionName": "Monthly-traffic",
            "path": "/monthly-traffic",
            "type": "link"
          },
        ]
      },

    ]

  constructor(
    public loginservice: loginServices,
    public navServices: NavService) { }
  username = localStorage.getItem('userName');
  password = localStorage.getItem('something');
  ngOnInit(): void {
    this.loginservice.GetRoleByNavigation().subscribe((data:any) => {
        this.itemsList = data?.parentNodes;
        //  this.itemsList = this.MENUITEMS
      })
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.permissions && menuItem.permissions.includes(item))
        menuItem.active = true
      if (menuItem.permissions) {
        menuItem.permissions.filter(submenuItems => {
          if (submenuItems.permissions && submenuItems.permissions.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }
  //Toggle Nav State
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.permissions) return false
        a.permissions.forEach(b => {
          if (a.permissions.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }
}
