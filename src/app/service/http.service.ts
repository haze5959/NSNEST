import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { comment } from '../model/comment';
import { posts } from '../model/posts';
import { user } from '../model/user';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient){}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }

  //============================================================
  //GET
  //============================================================
  /**
   * 유저정보 가져오기
   * sort = rank:잉여랭크 / stNum:학번
   */
  getUsers(sort: string, count: number): Observable<user[]> {
    const requestUrl = `${environment.apiUrl}users?sort=${sort}&count=${count}`;

    return this.http.get<user[]>(requestUrl);
  }

  getUser(userId: string): Observable<user> {
    const requestUrl = `${environment.apiUrl}user?userId=${userId}`;

    return this.http.get<user>(requestUrl);
  }

  /**
   * 게시글 가져오기
   */
  getPosts(sort: string, order: string, page: number): Observable<posts[]> {
    const requestUrl = `${environment.apiUrl}posts?sort=${sort}&order=${order}&page=${page}`;

    return this.http.get<posts[]>(requestUrl);
  }

  getPost(postId: string): Observable<posts> {
    const requestUrl = `${environment.apiUrl}post?postId=${postId}`;

    return this.http.get<posts>(requestUrl);
  }

  /**
   * 코멘트 가져오기
   */
  getComments(commentIdArr: string[]): Observable<comment[]> {
    const requestUrl = `${environment.apiUrl}comments?commentIdArr=${commentIdArr}`;

    return this.http.get<comment[]>(requestUrl);
  }

  //============================================================
  //POST
  //============================================================
  /**
   * 로그인하기
   */
  postLogin(userId:String, userPw:String): JSON {
    const requestUrl = `${environment.apiUrl}login`;

    return this.http.post(requestUrl, {
      "userId": userId,
      "userPw": userPw
    });
  }

  /**
   * 게시글 등록하기
   */
  postPosts(post:posts): JSON {
    const requestUrl = `${environment.apiUrl}posts`;

    return this.http.post(requestUrl, post);
  }

  /**
   * 코멘트 등록하기
   */
  postComments(comment: comment): JSON {
    const requestUrl = `${environment.apiUrl}comment`;

    return this.http.post(requestUrl, comment);
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