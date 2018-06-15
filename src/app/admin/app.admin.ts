import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppService } from '../service/appService';
import { HttpService } from '../service/http.service';
import { AppEmoticonDialog } from '../emoticonViewer/app.emoticonViewer';

@Component({
  selector: 'app-admin',
  templateUrl: './app.admin.html',
  styleUrls: ['./app.admin.css']
})
export class AppAdmin implements OnInit {

  @ViewChild('fileInput') fileInputEl:ElementRef;

  classify:string;

  constructor(private router: Router,private activeRoute: ActivatedRoute, private ElementRef:ElementRef, public dialog: MatDialog, private appService: AppService, public snackBar: MatSnackBar, private httpService: HttpService) { 
    
  }

  emoFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    if(!this.appService.isAppLogin && this.appService.myInfo.userId == 1111){
      alert('관리자가 아니잖어~');
      this.router.navigate(['/']);
    } 
  }

  uploadEmoticon(emoticonName:string, imageArr:File[]){
    if(this.emoFormControl.valid){
      this.appService.isAppLoading = true;

      this.httpService.postEmoticon(emoticonName, imageArr[0])
      .subscribe(
        data => {
          // console.log(JSON.stringify(data));
          if(data.result){  //성공
            this.snackBar.open(`이미지 업로드 완료[${imageArr.length}]`, "확인");
            this.appService.isAppLoading = false;
      
          } else {  //실패
            console.error("이미지 업로드 실패 - " + data.message);
            alert("이미지 업로드 실패 - " + data.message);
            this.appService.isAppLoading = false;
          }
        },
        error => {
          console.error("이미지 업로드 실패 - " + error.message);
          alert(`이미지 업로드 실패 - ` + error.message);
          this.appService.isAppLoading = false;
        }
      );
    } else {
      this.snackBar.open('이모티콘 명 입력해라', "확인");
    }
  }
}
