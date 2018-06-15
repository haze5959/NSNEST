import { Injectable, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CognitoUtil } from './awsService/cognito.service';
import { LoggedInCallback } from "../service/awsService/cognito.service";
import { Ng2DeviceService } from 'ng2-device-detector';
import { UserLoginService } from "../service/awsService/user-login.service";
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { user } from '../model/user';
// import { token } from '../model/token';
import { posts } from '../model/posts';
import { comment } from '../model/comment';
import { schedule } from '../model/schedule';
import { marker } from '../model/marker';

@Injectable()
export class AppService implements LoggedInCallback {
  APP_NAME = "NSNEST of Ancient";
  APP_VERSION = "V1.0";
  APP_COPYRIGHTS = "Copyright©2018 OQ All rights reserved.";
  emptyUserImage = "./assets/testImage.jpg";

  myInfo:user;
  isAppLoading = true;  //로딩 프로그레스를 보일지말지를 관장하는 환경변수
  isAppLogin = false;  //로그인이 됐는지 안됐는지 관장
  isPhone = false;

  @Output() refreshEventEmitter = new EventEmitter();

  constructor(private router: Router, private cognitoUtil: CognitoUtil, private deviceService: Ng2DeviceService, private userService: UserLoginService, private httpService: HttpService) {
    this.userService.isAuthenticated(this); //로그인 중인지 검사
    
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

    // if(this.cognitoUtil.getCurrentUser()){
    //   this.isAppLogin = true;
    // } else {
    //   this.isAppLogin = false;
    // }

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

  simplePostFactory(postArr: Array<any>){
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

  /**
   * 코그니토 딜리게이트
   * @param message 
   * @param isLoggedIn 
   */
  isLoggedIn(message: string, isLoggedIn: boolean) {
    if(isLoggedIn){ //로그인이 유지되어 있다면
      var userPayload;
      this.cognitoUtil.getIdToken({
          callback(): void{},
          callbackWithParam(result: any): void {
            // console.log(JSON.stringify(result));
            let jwtHelper = new JwtHelperService();
            userPayload = jwtHelper.decodeToken(result)
          }
      });

      // console.log("유저 정보 - " + JSON.stringify(userPayload));
      //유저 정보 설정
      this.httpService.getUserWithConito(userPayload.sub, userPayload.name, userPayload['custom:studentNum'], userPayload.birthdate, userPayload.gender).subscribe(
        data => {
          // console.log(JSON.stringify(data));
          if(data.length > 0){
            this.myInfo = this.userFactory(data)[0]; //로그인 유저 매핑
            this.isAppLogin = true;

            this.refreshEventEmitter.emit();
          } else {
            console.error("[error] - error: 데이터 없음");
            alert("유저 정보를 가져오지 못하였습니다. ");
          }
          
          this.isAppLoading = false;
        },
        error => {
          console.error("[error] - " + error.error.text);
          alert("유저 정보를 가져오지 못하였습니다. - " + error.error.text);
          this.isAppLoading = false;
        }
      );
      //유저 정보
    }else{  //로그인 안되어있음
      this.isAppLogin = false;
      this.isAppLoading = false;
    }
  }
}