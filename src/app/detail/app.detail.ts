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

import * as JSZip from '../../../node_modules/jszip/dist/jszip';
import * as JSZipUtils from '../../../node_modules/jszip-utils/dist/jszip-utils';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-detail',
  templateUrl: './app.detail.html',
  styleUrls: ['./app.detail.css']
})
export class AppDetail implements OnInit {
  isLoading = true;
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);

  myInfo:user = {
    userId: 11,
    name: '권오규',
    intro: '프로핑명 입니다.',
    description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
    studentNum:11,
    recentDate: new Date('1/1/16'),
    image: this.testImage,
    subImage01: Strings.TEST_IMAGE2
  }

  classify:string;
  isMine:boolean;
  postId:string;
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
          //파싱해라
          this.post = this.appService.postFactory(data[0]);
          this.isLoading = false;
          this.initDetail();  //뷰 초기화
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
    if(this.myInfo.userId == this.post.publisherId){
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

    if(this.post['commentId'] && this.post['commentId'].length > 0){
      this.httpService.getComments(this.post['commentId']).subscribe(
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
        //파싱해라
        // let user:user = data;
        // this.openUserDialog(user);
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
      let paramJson = {
        studentNum: 99,
        userId: 9999,
        userName: "에러",
        userImg: null,
        emoticon: null,
        comment: "코멘트를 불러오지 못하였습니다.",
        good: 0
      }

      this.httpService.postComment(paramJson).subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.comments.push(data);
        },
        error => {
          console.log(error);
          let user:user = this.httpService.errorUser;
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}