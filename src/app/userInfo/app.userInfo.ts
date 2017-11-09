import { Component, Directive, ElementRef, Input, Output } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-userInfo',
  templateUrl: '/app.userInfo.html',
  styleUrls: ['/app.userInfo.css']
})
export class AppUserInfo {
  constructor(public dialog: MatDialog) {}
  title = "@assets/testImage.jpg";

  openSetUserInfoDialog() {
    const dialogRef = this.dialog.open(SetUserInfoDialog, {
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-setUserInfoDialog',
  templateUrl: 'app.setUserInfoDialog.html',
})
export class SetUserInfoDialog {}
