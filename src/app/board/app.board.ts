import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material';
import { HttpService } from '../service/http.service';

import {zip} from 'rxjs/observable/zip';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { AppService } from '../service/appService';
// import { posts } from '../model/posts';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Strings } from '@app/Strings';

@Component({
  selector: 'app-board',
  templateUrl: '/app.board.html',
  styleUrls: ['/app.board.css']
})
export class AppBoard implements OnInit{
  
  isLoading = true;
  pageSize = 10;
  boardPosts = [];

  constructor(private httpService: HttpService, public appService: AppService) {}

  ngOnInit() {
    zip(
      this.httpService.getPosts(10, "id", "desc", 1), //해당 게시글 DB에서 빼온다
      this.httpService.getPostSize(10)  //해당 게시글 숫자를 가져온다
    ).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.boardPosts = this.appService.postFactory(data[0]);
        this.pageSize = data[1][0];
        this.isLoading = false;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.boardPosts.push(this.httpService.errorPost);
        this.isLoading = false;
      }
    );


    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(filterValue);
    this.isLoading = true;
    this.httpService.getPosts(this.pageSize, "id", "desc", 1, filterValue)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        // this.post = data;
        this.isLoading = false;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.boardPosts.push(this.httpService.errorPost);
        this.isLoading = false;
      }
    );
  }

  pageEvent(pageEvent: PageEvent) {
    console.log(pageEvent.pageIndex);
    console.log(pageEvent.pageSize);
    console.log(pageEvent.length);

    this.httpService.getPosts(this.pageSize, "id", "desc", pageEvent.pageIndex)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        // this.post = data;
        this.isLoading = false;
        // this.initDetail();  //뷰 초기화
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.boardPosts.push(this.httpService.errorPost);
        this.isLoading = false;
        // this.initDetail();  //뷰 초기화
      }
    );
  }
}
