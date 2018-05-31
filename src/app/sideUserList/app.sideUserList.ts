import { Component, OnInit, ElementRef, Input, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Strings } from '@app/Strings';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../service/http.service';
import { AppService } from '../service/appService';
import { user } from '../model/user';
import { posts } from '../model/posts';
import { schedule } from '../model/schedule';

@Component({
  selector: 'app-sideUserList',
  templateUrl: '/app.sideUserList.html',
  styleUrls: ['/app.sideUserList.css']
})
export class AppSideUserList implements OnInit {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  
  userOrderByLank: user[] = [];
  recentUsers: user[] = [];
  // scheduleArr: schedule[] = [
  //   {
  //     scheduleId:1000,
  //     userId: 1000,
  //     title: 'test일정001',
  //     description: '테스트용 일정입니다 001',
  //     startDate: new Date('18/06/17'),
  //     endDate: new Date('18/06/18'),
  //     participantsId: [1001, 1002]
  //   },
  //   {
  //     scheduleId:1001,
  //     userId: 1001,
  //     title: 'test일정002',
  //     description: '테스트용 일정입니다 002',
  //     startDate: new Date('18/07/17'),
  //     endDate: new Date('18/07/30'),
  //     participantsId: []
  //   }
  // ];
  
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private appService: AppService, private httpService: HttpService, private router: Router) {}
  
  ngOnInit() {
    //해당 게시글 DB에서 빼온다
    this.httpService.getUsers('update', 10)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (data.length == 0) {
          alert("유저 정보를 가져오지 못하였습니다.");
        } else {
          this.recentUsers = this.appService.userFactory(data)
          // this.isLoading = false;
        }
      },
      error => {
        console.error("[error] - error:" + error);
        alert("유저 정보를 가져오지 못하였습니다. " + error);
      }
    );
  }

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

  pressOneSchedule(scheduleId:number){
    this.router.navigate(['detail/' + scheduleId]);
  }

  tabChange(event){
    console.log("testOQOQOQO");
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
