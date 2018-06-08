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

import { posts } from '../model/posts';
import { marker } from "../model/marker";
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-tasty-load',
  templateUrl: '/app.tastyLoad.html',
  styleUrls: ['/app.tastyLoad.css']
})
export class AppTastyLoad {
  // initial center position for the map
  lat: number = 37.520000;
  lng: number = 127.000000; //용산구 좌표

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  showDetailView(postID:number){
    this.router.navigate(['detail/' + postID]);
  }

  testImage = this.sanitizer.bypassSecurityTrustStyle(this.appService.TEST_IMAGE);
  postMarkers: posts[] = [];

  constructor(private sanitizer: DomSanitizer, private appService: AppService, private httpService: HttpService, private router: Router) {}
  isLoading = true;
  pageSize = 0;
  pageLength = 0;
  orderBy = "id";
  orderBySeq = "desc";
  filterValue = "";

  ngOnInit() {
    zip(
      this.httpService.getPosts(30, this.orderBy, this.orderBySeq, 1), //해당 게시글 DB에서 빼온다
      this.httpService.getPostSize(30)  //해당 게시글 숫자를 가져온다
    ).subscribe(
      data => {
        // console.log(JSON.stringify(data));
        this.postMarkers = this.appService.postFactory(data[0]);
        this.pageLength = data[1][0];
        this.pageSize = this.postMarkers.length;
        this.isLoading = false;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.postMarkers.push(this.httpService.errorPost);
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
        // console.log(JSON.stringify(data));
        this.postMarkers = this.appService.postFactory(data[0]);
        this.pageLength = data[1][0];
        this.pageSize = this.postMarkers.length;
        this.isLoading = false;
        this.filterValue = filterValue;
      },
      error => {
        console.error("[error] - " + error.error.text);
        alert("[error] - " + error.error.text);
        this.postMarkers.push(this.httpService.errorPost);
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