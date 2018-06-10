import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CognitoUtil } from './awsService/cognito.service';
import { Ng2DeviceService } from 'ng2-device-detector';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../environments/environment';

import { user } from '../model/user';
// import { token } from '../model/token';
import { posts } from '../model/posts';
import { comment } from '../model/comment';
import { schedule } from '../model/schedule';
import { marker } from '../model/marker';

@Injectable()
export class AppService {
  APP_NAME = "NSNEST of Ancient";
  APP_VERSION = "V1.0";
  APP_COPYRIGHTS = "Copyright©2018 OQ All rights reserved.";
  emptyUserImage = "/../assets/testImage.jpg";

  myInfo:user;
  isAppLoading = true;  //로딩 프로그레스를 보일지말지를 관장하는 환경변수
  isAppLogin = false;  //로그인이 됐는지 안됐는지 관장
  isPhone = false;

  constructor(private cognitoUtil: CognitoUtil, private deviceService: Ng2DeviceService) {
    let deviceInfo = this.deviceService.getDeviceInfo();
    // console.log(deviceInfo);
    if(deviceInfo.device == "unknown"){
      //모바일 화면입니다.
      console.log('PC 화면입니다.');
      this.isPhone = false;
    } else {
      console.log('모바일 화면입니다.');
      this.isPhone = true;
    }

    if(this.cognitoUtil.getCurrentUser()){
      this.isAppLogin = true;
    } else {
      this.isAppLogin = false;
    }

    this.myInfo = {
      image: this.emptyUserImage
    }
  }

  isTokenExpired(token: string) {
    let jwtHelper = new JwtHelperService();
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

      let marker:marker = null;
      if(element[13]){
        marker = JSON.parse(element[13]);
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
          publisherImg: element[6]?element[6]:this.emptyUserImage,
          images: imageArr,
          title: element[8],
          body: element[9],
          good: element[10],
          bad: element[11],
          postDate: element[12],
          marker: marker,
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
          userImg: element[5]?element[5]:this.emptyUserImage,
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
      let recentDate;
      if(element[4]){
        let tempStr:string = element[4];
        recentDate = tempStr.replace(/\\/gi, '-');
      }

      let birthDay;
      if(element[10]){
        let tempStr:string = element[10];
        birthDay = tempStr.replace(/\\/gi, '-');
      }
      
      let user:user = {
        name: element[0],
        userId: element[1],
        intro: element[2],
        studentNum: element[3],
        recentDate: recentDate,
        image: element[5]?element[5]:this.emptyUserImage,
        subImage01: element[6],
        point: element[7],
        description: element[8],
        cognitoSub: element[9],
        birthDay: birthDay,
        gender: element[11]
      };
      
      result.push(user);
    });

    return result
  }

  scheduleFactory(scheduleArr: Array<any>){
    var result:schedule[] = [];

    scheduleArr.forEach(element => {
      console.log(element);
        let schedule:schedule = {
          scheduleId: element[0],
          userId: element[0],
          title: element[0],
          description: element[0],
          startDate: element[0],
          endDate: element[0],
          participantsId: element[0]
        };
        result.push(schedule);
    });

    return result
  }
}