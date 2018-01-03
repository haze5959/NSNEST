import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
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
      //유저 정보
    }else{  //로그인 안되어있음
      //로그인 창
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

  openProfileImage(){
    console.log("이미지 열기");
    let dialogRef = this.dialog.open(ShowDetailImageDialog, {
      height: '80%',
      width: '80%',
      data: { imageUrl: this.profileImage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result => '+ result);
    });
  }
}

/**
 * 유저 정보 편집 다이얼로그------------------------------------------------
 */
@Component({
  selector: 'dialog-setUserInfoDialog',
  templateUrl: 'dialog.setUserInfoDialog.html',
})
export class SetUserInfoDialog {}

/**
 * 프로필 이미지 다이얼로그--------------------------------------------------
 */
@Component({
  selector: 'dialog-showDetailImageDialog',
  templateUrl: 'dialog.showDetailImageDialog.html',
})
export class ShowDetailImageDialog {
  imageUrl = this.data.imageUrl;
  constructor(
    public dialogRef: MatDialogRef<ShowDetailImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}