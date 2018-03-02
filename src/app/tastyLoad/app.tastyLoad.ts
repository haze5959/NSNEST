import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

import { posts } from '../model/posts';
import { Strings } from '@app/Strings';
import { DomSanitizer } from '@angular/platform-browser';

import { marker } from "../model/marker";

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
    alert(postID);
  }

  mapClicked(){

  }

  markers: marker[] = [
	  {
		  lat: 37.497959,
		  lng: 126.929769,
		  label: '오규집'
	  },
	  {
		  lat: 37.450524,
		  lng: 127.128913,
		  label: '가천대'
	  },
	  {
		  lat: 37.516430,
		  lng: 126.907832,
		  label: '영등포역'
	  }
  ];

  testImage = this.sanitizer.bypassSecurityTrustStyle(Strings.TEST_IMAGE);
  postMarkers: posts[] = [
    {
      postsID: 1000,
      postClassify: 30, //지도
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 10,
      bad: 0,
      commentId: [1000, 10001, 10002],
      marker: this.markers[0]
    },
    {
      postsID: 1001,
      postClassify: 30,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 20,
      commentId: [1000, 10001],
      marker: this.markers[1]
    },
    {
      postsID: 1000,
      postClassify: 30,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2, Strings.NODATA_IMAGE],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002],
      marker: this.markers[2]
    },
    {
      postsID: 1000,
      postClassify: 30,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [],
      marker: this.markers[0]
    },
    {
      postsID: 1000,
      postClassify: 30,
      studentNum: 11,
      publisher: '권오규',
      publisherIntro: '프로필 명 입니다.',
      publisherImg: this.testImage,
      images: [Strings.TEST_IMAGE2],
      title: '타이틀 입니다.',
      body: '내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.용 입니다. 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.내용 입니다.',
      good: 0,
      bad: 0,
      commentId: [1000, 10001, 10002],
      marker: this.markers[2]
    }
  ];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  displayedColumns = ['created', 'writer', 'number', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          console.log(data);
          for(var i = 0; i < 20; i++){
            data.items.pop();
          }
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          // this.isRateLimitReached = true;
          return observableOf([{
            created_at:new Date('1/1/16'),
            number: '777',
            state: '777',
            title: 'ddd'
          }]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }
}

/**
 * =========================예제 쓸어온거============================
 */
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

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}
  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}