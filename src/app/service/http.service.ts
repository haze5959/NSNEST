import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CognitoUtil } from './awsService/cognito.service';
import { AppService } from "../service/appService";

import { environment } from '../../environments/environment';
import { comment } from '../model/comment';
import { posts } from '../model/posts';
import { user } from '../model/user';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private cognitoUtil: CognitoUtil, private appService: AppService){}

  //============================================================
  //GET
  //============================================================
  /**
   * 유저정보 가져오기
   * sort = rank:잉여랭크 / stNum:학번
   */
  getUsers(sort: string, count: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}users?sort=${sort}&count=${count}`;

    return this.http.get<Array<any>>(requestUrl);
  }

  getUser(userId: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}users?userId=${userId}`;

    return this.http.get<Array<any>>(requestUrl);
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

    if(this.appService.isTokenExpired(accessToken)){
      alert("토큰 리프레시");
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
    
    return this.http.get<Array<any>>(requestUrl);
  }

  getPost(postId: string): Observable<Array<any>> {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(this.appService.isTokenExpired(accessToken)){
      alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }

    const requestUrl = `${environment.apiUrl}posts?postId=${postId}&accessToken=${accessToken}`;
    return this.http.get<Array<any>>(requestUrl);
  }

  getPostSize(classify: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}posts/pageSize?classify=${classify}`;

    return this.http.get<Array<any>>(requestUrl);
  }

  /**
   * 코멘트 가져오기
   */
  getComments(postId: number): Observable<Array<any>> {
    const requestUrl = `${environment.apiUrl}comments?postId=${postId}`;

    return this.http.get<Array<any>>(requestUrl);
  }

  //============================================================
  //POST
  //============================================================
  /**
   * 로그인하기
   * 서버에서 해당 유저의 정보가 없는 경우, 첫 로그인이라고 판별하고 유저를 디비에 등록시킨다.
   */
  postLogin(userId:String, userPw:String): any {
    const requestUrl = `${environment.apiUrl}login`;

    return this.http.post(requestUrl, {
      "userId": userId,
      "userPw": userPw
    });
  }

  /**
   * 게시글 등록하기
   */
  postPost(postJson:any): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(this.appService.isTokenExpired(accessToken)){
      alert("토큰 리프레시");
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
    return this.http.post(requestUrl, param);
  }

  /**
   * 코멘트 등록하기
   */
  postComment(commentJson:any): any {
    const requestUrl = `${environment.apiUrl}comment`;

    return this.http.post(requestUrl, commentJson);
  }

  /**
   * 이미지 등록하기
   */
  uploadImage(image: ImageBitmap): any {
    const requestUrl = `${environment.apiUrl}comment`;

    return this.http.post(requestUrl, {
      "image": image
    });
  }

  //============================================================
  //PUT
  //============================================================
  /**
   * 게시글 수정하기
   */
  putPost(postJson:any): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(this.appService.isTokenExpired(accessToken)){
      alert("토큰 리프레시");
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
    
    return this.http.put(requestUrl, param);
  }

  //============================================================
  //DELETE
  //============================================================
  /**
   * 게시글 삭제
   */
  deletePost(postId:String): any {
    var accessToken = "";
    this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
    });

    if(this.appService.isTokenExpired(accessToken)){
      alert("토큰 리프레시");
      this.cognitoUtil.refresh();
      this.cognitoUtil.getAccessToken({
        callback(): void{},
        callbackWithParam(result: any): void {
          accessToken = result;
        }
      });
    }
    
    const requestUrl = `${environment.apiUrl}post?postId=${postId}&accessToken=${accessToken}`;

    return this.http.delete(requestUrl);
  }

  /**
   * 코멘트 삭제
   */
  deleteComment(commentId:String): any {
    const requestUrl = `${environment.apiUrl}comments?commentId=${commentId}`;

    return this.http.delete(requestUrl);
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