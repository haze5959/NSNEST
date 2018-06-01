import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from "rxjs/Rx";
import { CognitoUtil } from './awsService/cognito.service';
import { AppService } from "../service/appService";

import { environment } from '../../environments/environment';
import { comment } from '../model/comment';
import { posts } from '../model/posts';
import { user } from '../model/user';

const timeout = 30000; //30초
const timeoutText = {text: "타임아웃 되었습니다."};

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private cognitoUtil: CognitoUtil, private appService: AppService){}

  //============================================================
  //GET
  //============================================================
  /**
   * 유저정보 가져오기
   * sort = rank:잉여랭크 / update:활동일
   */
  getUsers(sort: string, count: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}users?sort=${sort}&count=${count}`;

    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  getUser(userId: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}users?userId=${userId}`;

    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  /**
   * 게시글 가져오기
   * sort = id / good / bad
   */
  getPosts(classify: number, sort: string, order: string, page: number, contents?: string): Observable<Array<any>> {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(!accessToken || accessToken == "" || this.appService.isTokenExpired(accessToken)){
      // alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }

    let requestUrl = `${environment.apiUrl}posts?classify=${classify}&sort=${sort}&order=${order}&page=${page}&accessToken=${accessToken}`;
    if(contents){
      requestUrl = `${environment.apiUrl}posts?classify=${classify}&sort=${sort}&order=${order}&page=${page}&contents=${contents}&accessToken=${accessToken}`;
    }
    
    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  getPost(postId: number): Observable<Array<any>> {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(!accessToken || accessToken == "" || this.appService.isTokenExpired(accessToken)){
      // alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }

    const requestUrl = `${environment.apiUrl}posts?postId=${postId}&accessToken=${accessToken}`;
    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  getPostSize(classify: number, contents?: string): Observable<Array<any>> {
    var requestUrl = `${environment.apiUrl}posts/pageSize?classify=${classify}`;
    if(contents){
      requestUrl = requestUrl + `&contents=${contents}`;
    }

    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  /**
   * 코멘트 가져오기
   */
  getComments(postId: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}comment?postId=${postId}`;

    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  /**
   * 코그니토를 통한 유저정보 가져오기
   * 서버에서 해당 유저의 정보가 없는 경우, 첫 로그인이라고 판별하고 유저를 디비에 등록시킨다.
   */
  getUserWithConito(cognitoSub: string, name?: string, birthDay?: string, gender?: string): Observable<Array<any>> {
    var requestUrl = `${environment.apiUrl}users/cognito?cognitoSub=${cognitoSub}`;
    if(name && birthDay && gender){
      requestUrl = requestUrl + `&name=${name}` + `&birthDay=${birthDay}` + `&gender=${gender}`;
    }

    return this.http.get<Array<any>>(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  //============================================================
  //POST
  //============================================================
  
  /**
   * 게시글 등록하기
   */
  postPost(postJson:posts): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(!accessToken || accessToken == "" || this.appService.isTokenExpired(accessToken)){
      // alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }

    const requestUrl = `${environment.apiUrl}posts`;
    let param = {
      accessToken: accessToken,
      payload: postJson
    }
    return this.http.post(requestUrl, param).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  /**
   * 코멘트 등록하기
   */
  postComment(commentJson:comment): any {
    const requestUrl = `${environment.apiUrl}comment`;
    const param = {
      payload: commentJson
    }

    return this.http.post(requestUrl, param).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  /**
   * 이미지 등록하기
   */
  uploadImage(type:string ,image: File): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(!accessToken || accessToken == "" || this.appService.isTokenExpired(accessToken)){
      // alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }

    const requestUrl = `${environment.apiUrl}file/${type}`;

    const formData = new FormData();
    formData.append('file', image);

    return this.http.post(requestUrl, formData, {
      headers: {accessToken: accessToken}
    })
    // .timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: err});
    });
  }

  //============================================================
  //PUT
  //============================================================
  /**
   * 게시글 수정하기
   */
  putPostGoodBad(postId:number, userId:number, isGood:boolean): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(!accessToken || accessToken == "" || this.appService.isTokenExpired(accessToken)){
      // alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }

    const requestUrl = `${environment.apiUrl}posts`;

    let param = {
      accessToken: accessToken,
      payload: {
        postId: postId,
        userId: userId,
        isGood: isGood
      }
    }
    
    return this.http.put(requestUrl, param).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  //============================================================
  //DELETE
  //============================================================
  /**
   * 게시글 삭제
   */
  deletePost(postId:number): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(!accessToken || accessToken == "" || this.appService.isTokenExpired(accessToken)){
      // alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }
    
    const requestUrl = `${environment.apiUrl}posts?postId=${postId}&accessToken=${accessToken}`;

    return this.http.delete(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  /**
   * 코멘트 삭제
   */
  deleteComment(commentId:number, postId:number): any {
    const requestUrl = `${environment.apiUrl}comment?commentId=${commentId}&postId=${postId}`;

    return this.http.delete(requestUrl).timeout(timeout)
    .catch((err:Response) => {
      return Observable.throw({error: timeoutText});
    });
  }

  //============================================================
  //에러 데이터
  //============================================================
  errorPost:posts = {
    postsID: 999999,
    postClassify: 99,
    studentNum: 99,
    publisherId: 9999,
    publisher: '에러',
    publisherIntro: '게시글을 불러오지 못하였습니다.',
    publisherImg: null,
    images: null,
    title: '게시글을 불러오지 못하였습니다.',
    body: '',
    good: 9,
    bad: 99,
    postDate: null,
    marker: null,
    tag: null,
    commentCount: 99
  }

  errorComment:comment = {
    commentId: 999999,
    postId:9999,
    commentDate: new Date('9/99/99'),
    studentNum: 99,
    userId: 9999,
    userName: "에러",
    userImg: null,
    emoticon: null,
    comment: "코멘트를 불러오지 못하였습니다.",
    good: 0
  }

  errorUser:user = {
    userId: 999999,
    name: '에러',
    intro: '유저정보를 불러오지 못하였습니다.',
    description: '유저정보를 불러오지 못하였습니다.',
    studentNum:99,
    recentDate: new Date('9/9/99'),
    image: null,
    subImage01: null
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  hot: string;
  title: string;
}