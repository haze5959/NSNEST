import { Component, Directive, ElementRef, Input, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Strings } from '@app/Strings';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from '../model/user';

@Component({
  selector: 'app-sideUserList',
  templateUrl: '/app.sideUserList.html',
  styleUrls: ['/app.sideUserList.css']
})
export class AppSideUserList {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  
  connectedUsers: user[] = [
    {
      userId: 9999,
      name: '권오규',
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      studentNum:11,
      recentDate: new Date('1/1/16'),
      image: this.testImage,
      subImage01: Strings.TEST_IMAGE2
    },
    {
      userId: 9999,
      name: '이한빈',
      studentNum:12,
      recentDate: new Date('1/17/16'),
      image: this.testImage
    },
    {
      userId: 9999,
      name: '유현우',
      studentNum:13,
      recentDate: new Date('1/28/16'),
      image: this.testImage
    }
  ];

  allUsers: user[] = [
    {
      userId: 9999,
      name: '서명균',
      studentNum:11,
      recentDate: new Date('1/1/16'),
      image: this.testImage
    },
    {
      userId: 9999,
      name: '박상은',
      studentNum:12,
      recentDate: new Date('1/17/16'),
      image: this.testImage
    },
    {
      userId: 9999,
      name: '서영광',
      studentNum:13,
      recentDate: new Date('1/28/16'),
      image: this.testImage
    },
    {
      userId: 9999,
      name: '이중민',
      studentNum:14,
      recentDate: new Date('1/28/16'),
      image: this.testImage
    }
  ];
  
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) {}
  
  pressOneUser(user:user){
    console.log(user.name);

    const dialogRef = this.dialog.open(ShowUserInfoDialog, {
      height: "80%",
      width: "50%",
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

/**
 * 유저 정보 보기 다이얼로그------------------------------------------------
 */
@Component({
  selector: 'dialog-showUserInfoDialog',
  templateUrl: 'dialog.showUserInfoDialog.html',
})
export class ShowUserInfoDialog {
  user = this.data
  constructor(
    public dialogRef: MatDialogRef<ShowUserInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: user) {}
}
