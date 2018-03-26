import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  displayedColumns = ['created', 'writer', 'number', 'title'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.httpService!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          console.log(data);
          for(var i = 0; i < 10; i++){
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
