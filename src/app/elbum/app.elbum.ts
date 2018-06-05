import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { AppService } from '../service/appService';
import { Router } from '@angular/router';
import { posts } from '../model/posts';
import { PageEvent } from '@angular/material';

import {zip} from 'rxjs/observable/zip';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-elbum',
  templateUrl: '/app.elbum.html',
  styleUrls: ['/app.elbum.css']
})
export class AppElbum implements OnInit{
  postImages: posts[] = [];
  pageSize = 0;
  pageLength = 0;
  isLoading = true;

  constructor(private httpService: HttpService, public appService: AppService, private router: Router) {}

  ngOnInit() {
    zip(
      this.httpService.getPosts(20, 'id', 'desc', 1), //해당 게시글 DB에서 빼온다
      this.httpService.getPostSize(20)  //해당 게시글 숫자를 가져온다
    ).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.postImages = this.appService.postFactory(data[0]);
        this.pageLength = data[1][0];
        this.pageSize = this.postImages.length;
        this.isLoading = false;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.postImages.push(this.httpService.errorPost);
        this.isLoading = false;
      }
    );
  }

  setPageEvent(pageEvent: PageEvent){
    this.isLoading = true;
    this.httpService.getPosts(10, 'id', 'desc', pageEvent.pageIndex + 1)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.postImages = this.appService.postFactory(data);
        this.isLoading = false;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.postImages.push(this.httpService.errorPost);
        this.isLoading = false;
      }
    );
  }

  pressOneImage(postImage:posts){
    console.log(postImage.postsID);
  }
}