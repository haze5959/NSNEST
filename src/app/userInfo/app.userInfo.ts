import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from '../model/user';
import { ShowDetailImageDialog } from '../image-viewer/image-viewer.component';
import { UserLoginService } from "../service/awsService/user-login.service";
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from "../service/awsService/cognito.service";
import { environment } from '../../environments/environment';
import { JwtHelper } from 'angular2-jwt';

import { AppService } from '../service/appService';
import { CognitoUtil } from '../service/awsService/cognito.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-userInfo',
  templateUrl: '/app.userInfo.html',
  styleUrls: ['/app.userInfo.css']
})
export class AppUserInfo implements CognitoCallback, LoggedInCallback, OnInit {
  appName = this.appService.APP_NAME;
  appVersion = this.appService.APP_VERSION;
  appCopyrights = this.appService.APP_COPYRIGHTS;

  userId = new FormControl('', [Validators.required]);
  userPw = new FormControl('', [Validators.required]);
 
  constructor(public dialog: MatDialog, private userService: UserLoginService, private snackBar: MatSnackBar, private appService: AppService, private httpService: HttpService, private cognitoUtil: CognitoUtil, private router: Router) {}

  ngOnInit(){
    this.appService.isAppLoading = true;
    this.userService.isAuthenticated(this); //로그인 중인지 검사
  }

  pressLogout(){
    //로그아웃 눌렀을 경우
    this.userService.logout();
    this.userPw.setValue("");
    this.appService.isAppLogin = false;
    this.snackBar.open("로그아웃 되었습니다.", "확인", {
      duration: 2000,
    });
  }

  pressLogin(){
    if(this.userId.valid && this.userPw.valid){
      this.appService.isAppLoading = true;
      this.userService.authenticate(this.userId.value, this.userPw.value, this);
    }
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
        profileText: this.appService.myInfo.intro,
        profileDescription: this.appService.myInfo.description,
        profileImage: this.appService.myInfo.image
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProfileImage(){
    console.log("이미지 열기");
    var image = new Image();
    image.src = this.appService.TEST_IMAGE2;
    image.onload = () => {
      let dialogRef = this.dialog.open(ShowDetailImageDialog, {
        height: image.height.toString(),
        width: image.width.toString(),
        data: { imageUrl: this.appService.TEST_IMAGE2 }
      });

      dialogRef.afterClosed().subscribe(result => {});
    }
  }

  /**
   * AWS Delegate
   */
  isLoggedIn(message: string, isLoggedIn: boolean) {
    if(isLoggedIn){ //로그인이 유지되어 있다면
      var userPayload;
      this.cognitoUtil.getIdToken({
          callback(): void{},
          callbackWithParam(result: any): void {
            console.log(JSON.stringify(result));
            let jwtHelper: JwtHelper = new JwtHelper();
            userPayload = jwtHelper.decodeToken(result)
          }
      });

      // console.log("유저 정보 - " + JSON.stringify(userPayload));
      //유저 정보 설정
      this.httpService.getUserWithConito(userPayload.sub, userPayload.name, userPayload['custom:studentNum'], userPayload.birthdate, userPayload.gender).subscribe(
        data => {
          console.log(JSON.stringify(data));
          if(data.length > 0){
            this.appService.myInfo = this.appService.userFactory(data)[0]; //로그인 유저 매핑
            this.appService.isAppLogin = true;
            this.snackBar.open("로그인 성공", "확인", {
              duration: 2000,
            });

            this.router.navigate(['newspeed/']);
          } else {
            console.error("[error] - error: 데이터 없음");
            alert("유저 정보를 가져오지 못하였습니다. ");
          }
          
          this.appService.isAppLoading = false;
        },
        error => {
          console.error("[error] - " + error.error.text);
          alert("유저 정보를 가져오지 못하였습니다. - " + error.error.text);
          this.appService.isAppLoading = false;
        }
      );
      //유저 정보
    }else{  //로그인 안되어있음
      this.appService.isAppLogin = false;
      this.appService.isAppLoading = false;
    }
  }

  cognitoCallback(message: string, result: any) {
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

        this.appService.isAppLoading = false;
    } else { //로그인 성공
      // console.log("유저 정보 - " + JSON.stringify(result));
      const userPayload = result.idToken.payload;
      // userPayload.studentNum
      //유저 정보 설정custom:studentNum
      this.httpService.getUserWithConito(userPayload.sub, userPayload.name, userPayload['custom:studentNum'], userPayload.birthdate, userPayload.gender).subscribe(
        data => {
          console.log(JSON.stringify(data));
          if(data.length > 0){
            this.appService.myInfo = this.appService.userFactory(data[0])[0]; //로그인 유저 매핑
            this.appService.isAppLogin = true;
            this.snackBar.open("로그인 성공", "확인", {
              duration: 2000,
            });

            this.router.navigate(['newspeed/']);
          } else {
            console.error("[error] - error: 데이터 없음");
            alert("유저 정보를 가져오지 못하였습니다. ");
          }
          
          this.appService.isAppLoading = false;
        },
        error => {
          console.error("[error] - " + error.error.text);
          alert("유저 정보를 가져오지 못하였습니다. - " + error.error.text);
          this.appService.isAppLoading = false;
        }
      );
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
  profileImage = this.appService.TEST_IMAGE2;
  constructor(
    private appService: AppService,
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