import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { posts } from '../model/posts';
import { marker } from '../model/marker';
import { user } from '../model/user';
import { comment } from '../model/comment';
import { Strings } from '@app/Strings';
import { ShowUserInfoDialog } from '../sideUserList/app.sideUserList';

@Component({
  selector: 'app-detail',
  templateUrl: './app.detail.html',
  styleUrls: ['./app.detail.css']
})
export class AppDetail implements OnInit {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);

  myInfo:user = {
    name: '권오규',
    intro: '프로핑명 입니다.',
    description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
    studentNum:11,
    recentDate: new Date('1/1/16'),
    image: this.testImage,
    subImage01: Strings.TEST_IMAGE2
  }

  classify:string;
  postId:string;
  post:posts;
  safeHtml:SafeHtml;
  marker:marker;
  comments:comment[];
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.postId = params['postId'];
      //해당 게시글 DB에서 빼온다
      this.post = 
      {
        postsID: 1000,
        postClassify: 10,
        studentNum: 11,
        publisherId: 1001,
        publisher: '권오규',
        publisherIntro: '프로필 명 입니다.',
        publisherImg: this.testImage,
        images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
        title: '포스트 타이틀 입니다.',
        body: '<p>sfsfsdff 테스트</p><p><br></p><p>테스트으으</p><p><br></p><p><br></p><p><img src="/../assets/testImage2.jpg"></p><p><br></p><p>그리고 영상</p><p><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/rvZtGFiHimA?showinfo=0"></iframe><p><br></p><p>끝</p>',
        good: 12,
        bad: 3,
        commentId: [1000, 10001, 10002]
      };
      // {
      //   postsID: 1001,
      //   postClassify: 20,
      //   studentNum: 11,
      //   publisherId: 1001,
      //   publisher: '권오규',
      //   publisherIntro: '프로필 명 입니다.',
      //   publisherImg: this.testImage,
      //   images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      //   title: '',
      //   body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      //   good: 10,
      //   bad: 0,
      //   commentId: [1000, 10001, 10002]
      // };
      // {
      //   postsID: 1002,
      //   postClassify: 30,
      //   studentNum: 11,
      //   publisherId: 1001,
      //   publisher: '권오규',
      //   publisherIntro: '프로필 명 입니다.',
      //   publisherImg: this.testImage,
      //   images: [Strings.TEST_IMAGE2, Strings.TEST_IMAGE2],
      //   title: '맛집이름',
      //   body: '엄청 맛있습니다.',
      //   good: 20,
      //   bad: 50,
      //   commentId: [10002],
      //   tag: "restaurant"
      //   marker: {
      //     lat: number;
      //     lng: number;
      //     label: "테스트 마커";
      //    }
      // };

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
      }

      //코맨트 redis에서 가져온다음 뿌린다
      this.comments = [
        {
          commentId: 1103,
          commentDate: new Date('3/19/18'),
          studentNum: 11,
          userId: 120,
          userName: "권오규",
          userImg: this.testImage,
          emoticon: null,
          comment: "코맨트 달았습니다.ddㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
          good: 99
        }, 
        {
          commentId: 1104,
          commentDate: new Date('3/19/18'),
          studentNum: 15,
          userId: 123,
          userName: "조상우",
          userImg: this.testImage,
          emoticon: null,
          comment: "코맨트 달았습니다.2 ㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\nㄴㄴㄴㄴㄴㄴㄴㄴ\n",
          good: 1
        }
      ];
    });
  }

  pressOneUser(userId:number){
    console.log("유저 아이디 : " + userId);
    //유저 DB에서 가져오기!
    let user:user = {
      name: '권오규',
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      studentNum:11,
      recentDate: new Date('1/1/16'),
      image: this.testImage,
      subImage01: Strings.TEST_IMAGE2
    };

    const dialogRef = this.dialog.open(ShowUserInfoDialog, {
      height: "80%",
      width: "50%",
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ${result}");
    });
  }
}