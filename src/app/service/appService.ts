import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { CognitoUtil } from './awsService/cognito.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../environments/environment';

import { user } from '../model/user';
// import { token } from '../model/token';
import { posts } from '../model/posts';
import { comment } from '../model/comment';

@Injectable()
export class AppService {
  myInfo:user
  isAppLoading = false;  //로딩 프로그레스를 보일지말지를 관장하는 환경변수
  isAppLogin = false;  //로그인이 됐는지 안됐는지 관장

  constructor(private cognitoUtil: CognitoUtil) {
    if(this.cognitoUtil.getCurrentUser()){
      this.isAppLogin = true;
    } else {
      this.isAppLogin = false;
    }

    this.myInfo = {
      userId: 999,
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
      let imageArr:string[] = [];
      if(element[7]){
        let imageStr:string = element[7];
        imageArr = imageStr.split(',');
      }

      let tagArr:string[] = [];
      if(element[14]){
        let tagStr:string = element[14];
        tagArr = tagStr.split(',');
      }

        let posts:posts = {
          postsID: element[0],
          postClassify: element[1],
          studentNum: element[2],
          publisherId: element[3],
          publisher: element[4],
          publisherIntro: element[5],
          publisherImg: element[6],
          images: imageArr,
          title: element[8],
          body: element[9],
          good: element[10],
          bad: element[11],
          postDate: element[12],
          marker: element[13],
          tag: tagArr,
          commentCount: element[15]
        };
        result.push(posts);
    });

    return result
  }

  commentFactory(commentArr: Array<any>){
    var result:comment[] = [];

    commentArr.forEach(element => {
        let comment:comment = {
          commentId: element[0],
          commentDate: element[1],
          studentNum: element[2],
          userId: element[3],
          userName: element[4],
          userImg: element[5],
          emoticon: element[6],
          good: element[7],
          comment: element[8],
          postId: element[9]
        };
        result.push(comment);
    });

    return result
  }

  userFactory(userArr: Array<any>){
    var result:user[] = [];

    userArr.forEach(element => {
        let user:user = {
          userId: element[0],
          studentNum: element[1],
          name: element[2],
          image: element[3],
          intro: element[4],
          description: element[5],
          recentDate: element[6],
          subImage01: element[7],
          point: element[8]
        };
        result.push(user);
    });

    return result
  }
}