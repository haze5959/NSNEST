import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../environments/environment';

import { user } from '../model/user';
// import { token } from '../model/token';
import { posts } from '../model/posts';

@Injectable()
export class AppService {
  myInfo:user
  isAppLoading = false;  //로딩 프로그레스를 보일지말지를 관장하는 환경변수

  constructor() {
    this.myInfo = {
      name: '테스터',
      intro: '테스터 인트로',
      description: '테스터 설명',
      studentNum:9999,
      recentDate: new Date('9/9/99'),
      image: null,
      subImage01: null
    }
  }

  isTokenExpired(token: string) {
    let jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.isTokenExpired(token);
  }

  postFactory(postArr: Array<any>){
    var result:posts[] = [];

    postArr.forEach(element => {
        let posts:posts = {
          postsID: element[0],
          postClassify: element[1],
          studentNum: element[2],
          publisherId: element[3],
          publisher: element[4],
          publisherIntro: element[5],
          publisherImg: element[6],
          images: element[7],
          title: element[8],
          body: element[9],
          good: element[10],
          bad: element[11],
          postDate: element[12],
          marker: element[13],
          tag: element[14],
          commentCount: element[15]
        };
        result.push(posts);
    });

    return result
  }

  // getUserid(): string {
  //   return this.jwtHelper.decodeToken(this.getToken()).userid;
  // }
}