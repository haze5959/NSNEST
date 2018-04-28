import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Strings } from '@app/Strings';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from '../model/user';
import { ShowDetailImageDialog } from '../image-viewer/image-viewer.component';

import { AuthService } from '../service/authService';

@Component({
  selector: 'app-userInfo',
  templateUrl: '/app.userInfo.html',
  styleUrls: ['/app.userInfo.css']
})
export class AppUserInfo implements OnInit {
  appName = Strings.APP_NAME;
  appVersion = Strings.APP_VERSION;
  appCopyrights = Strings.APP_COPYRIGHTS;
  isLogin = false;

  userId = new FormControl('', [Validators.required]);
  userPw = new FormControl('', [Validators.required]);

  //프로필 관련 정보
  myInfo:user = {
    studentNum: 11,
    name: '권오규',
    image: this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE),
    intro: "프로필명 입니다.",
    description: "프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다.프로필 설명 입니다."
  }
 
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private authService: AuthService) {}

  ngOnInit(){
    //쿠키로 로그인 유지 날짜까지 계속 보관할거야
    //todo
    if(this.isLogin){ //로그인이 유지되어 있다면
      //유저 정보
    }else{  //로그인 안되어있음
      //쿠키정보로 서버에 세션 유지되어있나 확인 후 자동로그인 or 로그아웃 상태
    }
  }

  pressLogout(){
    //로그아웃 눌렀을 경우
  }

  pressLogin(){
    alert(this.authService.TESTValue);
  }

  pressRegistration(){
    this.authService.TESTValue = "바뀜!";
  }

  openSetUserInfoDialog(){
    const dialogRef = this.dialog.open(SetUserInfoDialog, {
      height: "90%",
      width: "80%",
      data: { 
        profileText: this.myInfo.intro,
        profileDescription: this.myInfo.description,
        profileImage: this.myInfo.image
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProfileImage(){
    console.log("이미지 열기");
    var image = new Image();
    image.src = Strings.TEST_IMAGE2;
    image.onload = () => {
      let dialogRef = this.dialog.open(ShowDetailImageDialog, {
        height: image.height.toString(),
        width: image.width.toString(),
        data: { imageUrl: Strings.TEST_IMAGE2 }
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
  profileImage = Strings.TEST_IMAGE2;
  constructor(
    public dialogRef: MatDialogRef<ShowDetailImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      //초기화 구문
      this.userInfo = fb.group({
        'profileText': this.profileText,
        'profileDescription': this.profileDescription
      });
     }

    //이미지 변경
    changeImage(event: EventTarget): void {
      let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      let files: FileList = target.files;
      let file: File = files[0];
      console.log(file);

      //todo: 상태정보 변경에서 이미지 수정 시, 파일 서버에 저장하고 뿌려라
    }

    //유저정보 수정 저장
    pressSaveBtn(): void {
      //todo: 상태정보 저장 시, 디비에 수정목록 저장해라
      this.dialogRef.close();
    }
}