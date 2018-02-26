import { Component } from '@angular/core';
import { postImage } from '../model/postImage';
import { Strings } from '@app/Strings';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-elbum',
  templateUrl: '/app.elbum.html',
  styleUrls: ['/app.elbum.css']
})
export class AppElbum {
  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  postImages: postImage[] = [
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    },
    {
      studentNum: 11,
      name: '권오규',
      profileImage: this.testImage,
      intro: '프로핑명 입니다.',
      description: '유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.유저 소개입니다.',
      recentDate: new Date('12/1/16'),
      image: Strings.TEST_IMAGE2
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

}