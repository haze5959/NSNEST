import { Component } from '@angular/core';
import { posts } from '../model/posts';
import { Strings } from '@app/Strings';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-elbum',
  templateUrl: '/app.elbum.html',
  styleUrls: ['/app.elbum.css']
})
export class AppElbum {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  postImages: posts[] = [
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: []
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.NODATA_IMAGE],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: []
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    },
    {
      postsID: 1000,
      postClassify: 20,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002]
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  pressOneImage(postImage:posts){
    console.log(postImage.postsID);
  }
}