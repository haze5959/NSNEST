import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CognitoUtil } from './awsService/cognito.service';
import { LoggedInCallback } from "../service/awsService/cognito.service";
import { Ng2DeviceService } from 'ng2-device-detector';
import { UserLoginService } from "../service/awsService/user-login.service";
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import {Observable} from 'rxjs/Observable';

import { user } from '../model/user';
// import { token } from '../model/token';
import { posts } from '../model/posts';
import { comment } from '../model/comment';
import { schedule } from '../model/schedule';
import { marker } from '../model/marker';
import { Subscriber } from 'rxjs';

@Injectable()
export class AppService implements LoggedInCallback {
  APP_NAME = "NSNEST of Ancient";
  APP_VERSION = "V1.0";
  APP_COPYRIGHTS = "Copyright©2018 OQ All rights reserved.";
  emptyUserImage = "./assets/NO_PROFILE_IMG.png";

  myInfo:user;
  isAppLoading = true;  //로딩 프로그레스를 보일지말지를 관장하는 환경변수
  isAppLogin = false;  //로그인이 됐는지 안됐는지 관장
  isPhone = false;

  // 상태저장
  newspeedPosts: posts[] = [];
  newspeedScrollY:number = 10;
  newspeedPageIndex:number = 1;

  refreshObserber = new Observable(observer => {
    this.refreshSubscriber = observer;
  });
  refreshSubscriber:Subscriber<{}>;

  constructor(private router: Router, private cognitoUtil: CognitoUtil, private deviceService: Ng2DeviceService, private userService: UserLoginService, private httpService: HttpService, private sanitizer: DomSanitizer) {
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

  simpleTermNowBetween(time: string) {  //형식: 18/07/05 22:07
    let oneMinute = 1000 * 60;
    let oneHour = oneMinute * 60;
    let oneDay = oneHour * 24;
    let oneMonth = oneDay * 30;
    let oneYear = oneMonth * 12;

    let year = time.substring(0, 2);
    let month = time.substring(3, 5);
    let day = time.substring(6, 8);
    let hour = time.substring(9, 11);
    let minute = time.substring(12, 14);

    let date1 = new Date();
    let date2 = new Date(`20${year}-${month}-${day}T${hour}:${minute}:00Z`);
    let timeDiff = Math.abs(date1.getTime() - (date2.getTime() - 3600000 * 9));

    if(timeDiff > oneYear){
      let diff = Math.ceil(timeDiff / oneYear); 
      return diff.toString() + "년 전";

    } else if(timeDiff > oneMonth){
      let diff = Math.ceil(timeDiff / oneMonth); 
      return diff.toString() + "개월 전";

    } else if(timeDiff > oneDay){
      let diff = Math.ceil(timeDiff / oneDay); 
      return diff.toString() + "일 전";

    } else if(timeDiff > oneHour){
      let diff = Math.ceil(timeDiff / oneHour); 
      return diff.toString() + "시간 전";

    } else if(timeDiff > oneMinute){
      let diff = Math.ceil(timeDiff / oneMinute); 
      return diff.toString() + "분 전";

    } else {
      return "방금";
    }
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
          commentCount: element[15],
          regitDate: element[16]
        };
        result.push(posts);
    });

    return result
  }

  postSafeHtmlFactory(postArr: Array<any>){
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
          body: (element[1] == 10)?'':element[9],
          good: element[10],
          bad: element[11],
          postDate: element[12],
          marker: marker,
          tag: tagArr,
          commentCount: element[15],
          regitDate: element[16],
          safeHtml: (element[1] == 10)?this.sanitizer.bypassSecurityTrustHtml(element[9]):null
        };
        result.push(posts);
    });

    return result
  }

  simplePostFactory(postArr: Array<any>){
    var result:posts[] = [];

    postArr.forEach(element => {
      // console.log(JSON.stringify(element));
      let imageArr:string[] = [];
      if(element[5]){
        let imageStr:string = element[5];
        imageArr = imageStr.split(',');
      }

      let marker:marker = null;
      if(element[11]){
        marker = JSON.parse(element[11]);
      }

      let tagArr:string[] = [];
      if(element[12]){
        let tagStr:string = element[12];
        tagArr = tagStr.split(',');
      }

        let posts:posts = {
          postsID: element[0],
          postClassify: element[1],
          publisherId: element[2],
          publisher: element[3],
          publisherIntro: element[4],
          images: imageArr,
          title: element[6],
          body: element[7],
          good: element[8],
          bad: element[9],
          postDate: element[10],
          marker: marker,
          tag: tagArr,
          commentCount: element[13],
          regitDate: element[14]
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
          commentDate: element[1]?this.simpleTermNowBetween(element[1]):"널널",
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
        // let tempStr:string = element[4];
        // recentDate = tempStr.replace(/\\/gi, '-');
        recentDate = element[4]?this.simpleTermNowBetween(element[4]):"널널"
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

            if(this.refreshSubscriber){
              this.refreshSubscriber.next(true);
            }
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