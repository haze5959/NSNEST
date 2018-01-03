import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Strings } from '@app/Strings';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-userInfo',
  templateUrl: '/app.userInfo.html',
  styleUrls: ['/app.userInfo.css']
})
export class AppUserInfo implements OnInit {
  appName = Strings.APP_NAME;
  appVersion = Strings.APP_VERSION;
  appCopyrights = Strings.APP_COPYRIGHTS;
  profileImage = Strings.NODATA_IMAGE;
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnInit(){
    //쿠키로 로그인 유지 날짜까지 계속 보관할거야
    //todo
    if(true){ //로그인이 유지되어 있다면

    }else{  //로그인 안되어있음

    }
  }

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
