import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { posts } from '../model/posts';
import { DomSanitizer } from '@angular/platform-browser';
import { Strings } from '@app/Strings';

@Component({
  selector: 'app-newspeed',
  templateUrl: '/app.newspeed.html',
  styleUrls: ['/app.newspeed.css']
})
export class AppNewspeed {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  recentPosts: posts[] = [
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
    },
    {
      postsID: 1001,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 10,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1002,
      postClassify: 30,
      studentNum: 11,
      publisherId: 1001,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.TEST_IMAGE2],
      title: '존맛집',
      body: '엄청 맛있습니다.',
      good: 20,
      bad: 50,
      commentId: [10002],
      tag: ["restaurant", "★★★★"],
      marker: {
        lat: 37.497959,
        lng: 126.929769,
        label: '오규집'
       }
    },
    {
      postsID: 1002,
      postClassify: 10,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      // images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE],
      title: '타이틀 입니다.',
      body: '내용 입니다.ㄹ홀홀',
      good: 0,
      bad: 0,
      commentId: []
    },
    {
      postsID: 1003,
      postClassify: 10,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE],
      title: '타이틀 입니다.',
      body: '내용 입니다.ㄹ호로로',
      good: 0,
      bad: 0,
      commentId: []
    }
  ];

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  pressPosts(postsID){
    alert(postsID);
    this.router.navigate(['detail/' + postsID]);
  }

  /**
   * 무한 스크롤
   */
  onScroll () {
      this.recentPosts.push({
        postsID: 1002,
        postClassify: 10,
        studentNum: 11,
        publisher: '권오규',
        publisherIntro: '프로필 명 입니다.',
        publisherImg: this.testImage,
        images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE],
        title: '타이틀 입니다.',
        body: '내용 입니다.ㄹ홀홀',
        good: 0,
        bad: 0,
        commentId: [1000]
      },
      {
        postsID: 1003,
        postClassify: 10,
        studentNum: 11,
        publisher: '권오규',
        publisherIntro: '프로필 명 입니다.',
        publisherImg: this.testImage,
        // images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE],
        title: '타이틀 입니다.',
        body: '내용 입니다.ㄹ호로로',
        good: 0,
        bad: 0,
        commentId: []
      });
  }
}
