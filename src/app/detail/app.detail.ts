import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, AUTOCOMPLETE_OPTION_HEIGHT } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { posts } from '../model/posts';
import { marker } from '../model/marker';
import { user } from '../model/user';
import { comment } from '../model/comment';
import { Strings } from '@app/Strings';
import { ShowUserInfoDialog } from '../sideUserList/app.sideUserList';
import { ShowDetailImageDialog } from '../image-viewer/image-viewer.component';
import { HttpService } from '../service/http.service';
import { AppService } from '../service/appService';

import * as JSZip from '../../../node_modules/jszip/dist/jszip';
import * as JSZipUtils from '../../../node_modules/jszip-utils/dist/jszip-utils';
import * as FileSaver from 'file-saver';
import { resolve } from 'path';

@Component({
  selector: 'app-detail',
  templateUrl: './app.detail.html',
  styleUrls: ['./app.detail.css']
})
export class AppDetail implements OnInit {
  isLoading = true;
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);

  classify:string;
  isMine:boolean;
  postId:number;
  post:posts;
  safeHtml:SafeHtml;
  marker:marker;
  comments:comment[];
  constructor(private router: Router, private appService: AppService, private httpService: HttpService, private route: ActivatedRoute, public dialog: MatDialog, private sanitizer: DomSanitizer, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if(!this.appService.isAppLogin){
      alert("로그인이 되지 않았습니다.");
      this.router.navigate(['/']);
    } else {
      this.isMine = false;
      this.route.params.forEach((params: Params) => {
      this.postId = params['postId'];
    });

      //해당 게시글 DB에서 빼온다
      this.httpService.getPost(this.postId)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          if (data.length == 0) { //게시글을 못찾음
            alert("해당 게시글을 찾지 못하였습니다.");
            this.router.navigate(['/']);
          } else {
            this.post = this.appService.postFactory(data)[0];
            this.isLoading = false;
            this.initDetail();  //뷰 초기화
          }
        },
        error => {
          console.error("[error] - getPost:" + this.postId);
          this.post = this.httpService.errorPost;
          this.isLoading = false;
          this.initDetail();  //뷰 초기화
        }
      );
    }
  }

  initDetail(){
    if(this.appService.myInfo.userId == this.post.publisherId){
      //자기 자신의 글
      this.isMine = true;
    }

    switch(this.post['postClassify']){
      case 10:  //게시글
        this.classify = "post";
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.body);
        break;
      case 20:  //앨범
        this.classify = "elbum";
        break;
      case 30:  //지도
        this.classify = "map";
        this.marker = this.post['marker'];
        break;
      default:
        this.classify = "error";
    }

    if(this.post['commentCount'] && this.post['commentCount'] > 0){
      this.httpService.getComments(this.post['postsID']).subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.comments = data;
        },
        error => {
          console.log(error);
          this.comments = [this.httpService.errorComment];
        }
      );
    }
    
    // this.comments = [
    //   {
    //     commentId: 1103,
    //     commentDate: new Date('3/19/18'),
    //     studentNum: 11,
    //     userId: 120,
    //     userName: "권오규",
    //     userImg: this.testImage,
    //     emoticon: null,
    //     comment: "코맨트 달았습니다.ddㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    //     good: 99
    //   }, 
    //   {
    //     commentId: 1104,
    //     commentDate: new Date('3/19/18'),
    //     studentNum: 15,
    //     userId: 123,
    //     userName: "조상우",
    //     userImg: this.testImage,
    //     emoticon: null,
    //     comment: "코맨트 달았습니다.2 ㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\n",
    //     good: 1
    //   }
    // ];
  }
  
  pressOneUser(userId:number){
    console.log("유저 아이디 : " + userId);
    //유저 DB에서 가져오기!
    this.httpService.getUser(userId).subscribe(
      data => {
        console.log(JSON.stringify(data));
        if (data.length == 0) { //해당 유저를 못찾음
          alert("해당 유저를 찾지 못하였습니다.");
          throw("해당 유저를 찾지 못하였습니다.");
        } else {
          let user:user = data[0];
          this.openUserDialog(user);
        }
      },
      error => {
        console.log(error);
        let user:user = this.httpService.errorUser;
        this.openUserDialog(user);
      }
    );
  }

  openUserDialog(user:user){
    const dialogRef = this.dialog.open(ShowUserInfoDialog, {
      height: "80%",
      width: "50%",
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ${result}");
    });
  }

  pressImageDownload(images:Array<string>){
    var zip = new JSZip();
    var count = 0;
    var zipFilename = "zipFilename.zip";

    images.forEach(function(url){
      console.log("url : " + url);
      var filename = url.substr(url.lastIndexOf('/') + 1);
      console.log("filename : " + filename);
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if(err) {
            throw err; // or handle the error
        }
        zip.file(filename, data, {binary:true});
        count++;
        if (count == images.length) {
          var zipFile = zip.generateAsync({compression:'STORE', type:'base64'});
          FileSaver.saveAs(zipFile, filename);
        }
      });
    });
  }

  openImageVeiwer(imageStr:string){
    console.log("이미지 열기");
    var image = new Image();
    image.src = imageStr;
    image.onload = () => {
      let dialogRef = this.dialog.open(ShowDetailImageDialog, {
        height: image.height.toString(),
        width: image.width.toString(),
        data: { imageUrl: imageStr }
      });

      dialogRef.afterClosed().subscribe(result => {});
    }
  }

  pressCommentRegist(comment:string){
    console.log("코맨트 : " + comment);
    
    if(comment == ""){
      this.openSnackBar("코멘트를 입력해주세요.");
    }else{
      //코멘트 등록 후 업데이트
      let paramJson:comment = {
        // commentId: 1111,
        postId: 1234,
        // commentDate: ,
        // studentNum: 11,
        userId: this.appService.myInfo.userId,   
        // userName: 'string',
        // userImg: '',
        emoticon: 'emoti001',
        comment: comment
      }

      new Promise((resolve, reject) => {
        this.httpService.postComment(paramJson).subscribe(
          data => {
            console.log(JSON.stringify(data));
            if(data.result){  //성공
              resolve();
            } else {  //실패
              reject(data.message);
            }
          },
          error => {
            console.log(error);
            reject("서버가 불안정합니다.");
          }
        );
      }).then(() => { //댓글 새로 가져오기
        this.httpService.getComments(this.post['postsID']).subscribe(
          data => {
            console.log(JSON.stringify(data));
            if(data.length > 0){  //성공
              this.comments = data[0];
              resolve();
            } else {  //실패
              throw("서버가 불안정합니다.");
            }
          },
          error => {
            console.log(error);
            this.comments = [this.httpService.errorComment];
          }
        );
      }).catch(err => {
        alert(err);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}