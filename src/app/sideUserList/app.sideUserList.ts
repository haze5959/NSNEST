import { Component, OnInit, ElementRef, Input, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Strings } from '@app/Strings';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../service/http.service';
import { AppService } from '../service/appService';
import { user } from '../model/user';

@Component({
  selector: 'app-sideUserList',
  templateUrl: '/app.sideUserList.html',
  styleUrls: ['/app.sideUserList.css']
})
export class AppSideUserList implements OnInit {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  
  userOrderByLank: user[] = [];
  recentUsers: user[] = [];
  
  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private appService: AppService, private httpService: HttpService) {}
  
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
