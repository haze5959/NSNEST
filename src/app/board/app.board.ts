import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

import {zip} from 'rxjs/observable/zip';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { AppService } from '../service/appService';

@Component({
  selector: 'app-board',
  templateUrl: '/app.board.html',
  styleUrls: ['/app.board.css']
})
export class AppBoard implements OnInit{
  
  isLoading = true;
  pageSize = 0;
  pageLength = 0;
  boardPosts = [];
  orderBy = "id";
  orderBySeq = "desc";
  filterValue = "";

  constructor(private httpService: HttpService, public appService: AppService, private router: Router) {}

  ngOnInit() {
    zip(
      this.httpService.getPosts(10, this.orderBy, this.orderBySeq, 1), //해당 게시글 DB에서 빼온다
      this.httpService.getPostSize(10)  //해당 게시글 숫자를 가져온다
    ).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.boardPosts = this.appService.postFactory(data[0]);
        this.pageLength = data[1][0];
        this.pageSize = this.boardPosts.length;
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
    zip(
      this.httpService.getPosts(10, this.orderBy, this.orderBySeq, 1, filterValue), //해당 게시글 DB에서 빼온다
      this.httpService.getPostSize(10, filterValue)  //해당 게시글 숫자를 가져온다
    ).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.boardPosts = this.appService.postFactory(data[0]);
        this.pageLength = data[1][0];
        this.pageSize = this.boardPosts.length;
        this.isLoading = false;
        this.filterValue = filterValue;
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
    this.isLoading = true;
    this.httpService.getPosts(10, this.orderBy, this.orderBySeq, pageEvent.pageIndex + 1)
    .subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.boardPosts = this.appService.postFactory(data);
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

  pressOrderBy(orderByStr:string){
    if(this.orderBy == orderByStr){
      this.orderBySeq = this.orderBySeq == 'desc' ? 'asc' : 'desc';
    }else{
      this.orderBy = orderByStr;
      this.orderBySeq = 'desc';
    }

    this.applyFilter(this.filterValue);
  }

  pressPost(postId:number){
    this.router.navigate(['detail/' + postId]);
  }
}
