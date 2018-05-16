import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material';
import { HttpService } from '../service/http.service';

import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
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

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    //해당 게시글 DB에서 빼온다
    this.httpService.getPosts(this.pageSize, "id", "desc", 1)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        // this.post = data;
        this.isLoading = false;
        // this.initDetail();  //뷰 초기화
      },
      error => {
        console.error("[error] - " + error.error.text);
        this.boardPosts.push(this.httpService.errorPost);
        this.boardPosts.push(this.httpService.errorPost);
        this.boardPosts.push(this.httpService.errorPost);
        this.isLoading = false;
        // this.initDetail();  //뷰 초기화
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
        // this.initDetail();  //뷰 초기화
      },
      error => {
        console.error("[error] - " + error.error.text);
        this.boardPosts.push(this.httpService.errorPost);
        this.boardPosts.push(this.httpService.errorPost);
        this.boardPosts.push(this.httpService.errorPost);
        this.isLoading = false;
        // this.initDetail();  //뷰 초기화
      }
    );
  }

  pageEvent(pageEvent: PageEvent) {
    console.log(pageEvent.pageIndex);
    console.log(pageEvent.pageSize);
    console.log(pageEvent.length);
  }
}
