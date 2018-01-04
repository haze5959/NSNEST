import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { Strings } from '@app/Strings';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  //프로필 관련 정보
  profileImage = Strings.TEST_IMAGE2;
  profileText = "프로필 명 입니다.";
  profileDescription = "프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.";
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

  pressLogout(){
    //로그아웃 눌렀을 경우
  }

  openSetUserInfoDialog(){
    const dialogRef = this.dialog.open(SetUserInfoDialog, {
      height: "90%",
      width: "80%",
      data: { 
        profileText: this.profileText,
        profileDescription: this.profileDescription
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProfileImage(){
    console.log("이미지 열기");
    var image = new Image();
    image.src = this.profileImage;
    image.onload = () => {
      let dialogRef = this.dialog.open(ShowDetailImageDialog, {
        height: image.height.toString(),
        width: image.width.toString(),
        data: { imageUrl: this.profileImage }
      });

      dialogRef.afterClosed().subscribe(result => {});
    }
  }
}

/**
 * 유저 정보 편집 다이얼로그------------------------------------------------
 */
@Component({
  selector: 'dialog-setUserInfoDialog',
  templateUrl: 'dialog.setUserInfoDialog.html',
})
export class SetUserInfoDialog {
  userInfo: FormGroup;
  profileText = this.data.profileText;
  profileDescription = this.data.profileDescription;
  constructor(
    public dialogRef: MatDialogRef<ShowDetailImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      //초기화 구문
      this.userInfo = fb.group({
        'profileText': this.profileText,
        'profileDescription': this.profileDescription
      });
     }

    //유저정보 수정 저장
    pressSaveBtn(): void {
      this.dialogRef.close();
    }
}

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

}