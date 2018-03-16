import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { posts } from '../model/posts';
import { Strings } from '@app/Strings';

@Component({
  selector: 'app-detail',
  templateUrl: './app.detail.html',
  styleUrls: ['./app.detail.css']
})
export class AppDetail implements OnInit {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);

  classify:number;
  postId:string;
  post:posts;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.postId = params['postId'];
      //해당 게시글 DB에서 빼온다
      this.post = 
      {
        postsID: 1000,
        postClassify: 10,
        studentNum: 11,
        publisher: '권오규',
        publisherIntro: '프로필 명 입니다.',
        publisherImg: this.testImage,
        images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
        title: '타이틀 입니다.',
        body: '내용 입니다.내용 입니다.\n내용 입니다.\n내용 입니다.\n내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
        good: 0,
        bad: 0,
        commentId: [1000, 10001, 10002]
      };
      // {
      //   postsID: 1001,
      //   postClassify: 20,
      //   studentNum: 11,
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
      // };
      this.classify = this.post['postClassify'];
    });
  }

}
