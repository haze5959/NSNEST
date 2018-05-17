import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { Strings } from '@app/Strings';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from '../model/user';
import { ShowDetailImageDialog } from '../image-viewer/image-viewer.component';
import { UserLoginService } from "../service/awsService/user-login.service";
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from "../service/awsService/cognito.service";
import { environment } from '../../environments/environment';

import { AppService } from '../service/appService';

@Component({
  selector: 'app-userInfo',
  templateUrl: '/app.userInfo.html',
  styleUrls: ['/app.userInfo.css']
})
export class AppUserInfo implements CognitoCallback, LoggedInCallback, OnInit {
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
 
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, public userService: UserLoginService, public snackBar: MatSnackBar, public appService: AppService) {}

  ngOnInit(){
    this.appService.isAppLoading = true;
    this.userService.isAuthenticated(this); //로그인 중인지 검사
  }

  pressLogout(){
    //로그아웃 눌렀을 경우
    this.userService.logout();
    this.isLogin = false;
    this.snackBar.open("로그아웃 되었습니다.", "확인", {
      duration: 2000,
    });
  }

  pressLogin(){
    this.appService.isAppLoading = true;
    this.userService.authenticate(this.userId.value, this.userPw.value, this);
  }

  pressRegistration(){
    alert("회원가입 페이지로 이동합니다.");
    document.location.href = environment.registPage;
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

  /**
   * AWS Delegate
   */
  isLoggedIn(message: string, isLoggedIn: boolean) {
    this.appService.isAppLoading = false;
    if(isLoggedIn){ //로그인이 유지되어 있다면
      this.isLogin = true;
      //유저 정보
    }else{  //로그인 안되어있음
      this.isLogin = false;
    }
  }

  cognitoCallback(message: string, result: any) {
    this.appService.isAppLoading = false;
    if (message != null) { //error
        console.log("result: " + message);
        if (message === 'User is not confirmed.') {
            this.snackBar.open("승인나지 않은 계정입니다.", "확인", {
              duration: 2000,
            });
        } else if (message === 'User needs to set password.') {
            //비밀번호 새로 설정. 지날 경우 없음
            this.snackBar.open("권오규한테 문의하시오.", "확인", {
              duration: 2000,
            });
        } else {  //아이디나 비밀번호 틀림
          this.snackBar.open("아이디나 비밀번호가 틀립니다.", "확인", {
            duration: 2000,
          });
        }
    } else { //로그인 성공
      this.isLogin = true;
      this.snackBar.open("로그인 성공", "확인", {
        duration: 2000,
      });
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