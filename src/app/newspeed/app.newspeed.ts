import { Component, OnInit } from '@angular/core';
import { posts } from '../model/posts';
import { Router } from '@angular/router';

import { AppService } from "../service/appService";
import { HttpService } from '../service/http.service';
import { CognitoUtil } from '../service/awsService/cognito.service';

@Component({
  selector: 'app-newspeed',
  templateUrl: './app.newspeed.html',
  styleUrls: ['./app.newspeed.css']
})
export class AppNewspeed implements OnInit {
  pageIndex: number = 1;
  recentPosts: posts[] = [];

  constructor(private router: Router, private httpService: HttpService, public appService: AppService, private cognitoUtil: CognitoUtil) {}

  ngOnInit(){
    if(this.appService.isAppLogin){
      this.initPosts();
    } else {
      this.appService.refreshObserber.subscribe(
        value => {
          this.initPosts();
        }
      );
    }
  }

  public initPosts(){
    if(this.cognitoUtil.getCurrentUser()){
      this.httpService.getPosts(0, "date", "desc", this.pageIndex) //해당 게시글 DB에서 빼온다
      .subscribe(
        data => {
          this.recentPosts = this.appService.postFactory(data);
          // console.log(JSON.stringify(this.recentPosts));
          this.appService.isAppLoading = false;
        },
        error => {
          console.error("[error] - " + error.error.text);
          alert("[error] - " + error.error.text);
          this.recentPosts.push(this.httpService.errorPost);
          this.appService.isAppLoading = false;
        }
      );
    } else {
      this.appService.isAppLoading = false;
      this.appService.isAppLogin = false;
      console.log("로그인 된 유저 없습니다.");
    }
  }

  pressPosts(postsID){
    this.router.navigate(['detail/' + postsID]);
  }

  /**
   * 무한 스크롤
   */
  onScroll () {
    this.appService.isAppLoading = true;
    this.httpService.getPosts(0, "date", "desc", this.pageIndex + 1) //해당 게시글 DB에서 빼온다
    .subscribe(
      data => {
        // console.log(JSON.stringify(data));
        if(data.length == 0){ //데이터가 더이상 없을 경우
          alert("마지막 게시글 입니다.");
        } else {
          this.recentPosts = this.recentPosts.concat(this.appService.postFactory(data));
          this.pageIndex++;
        }
        
        this.appService.isAppLoading = false;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.recentPosts.push(this.httpService.errorPost);
        this.appService.isAppLoading = false;
      }
    );
  }
}
