import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { AppService } from '../service/appService';

@Component({
  selector: 'app-emoticonViewer',
  templateUrl: './app.emoticonViewer.html',
  styleUrls: ['./app.emoticonViewer.css']
})
export class AppEmoticonDialog implements OnInit {
  
  emoticonList: JSON[] = [];  //{이모1: [url1, url2]} 이런식
  selectEmoticons:string[] = [];
  
  constructor(public dialogRef: MatDialogRef<AppEmoticonDialog>, private appService: AppService, private httpService: HttpService, private router: Router) {}
  
  ngOnInit() {
    //해당 게시글 DB에서 빼온다
    this.httpService.getEmoticon()
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (data.length == 0) {
          alert("이모티콘 정보를 가져오지 못하였습니다.");
        } else {
          // this.emoticonList = this.appService.userFactory(data)
        }
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("이모티콘 정보를 가져오지 못하였습니다. - " + error.error.text);
      }
    );
  }

  tabChange(event:number){
    let keyArr = this.emoticonList.keys();
    console.log('OQ tabChange => ' + keyArr[event]);
  }

  pressEmoticon(index:number){
    console.log('OQ pressEmoticon => ' + index);
    this.dialogRef.close(this.selectEmoticons[index]);
  }
}
