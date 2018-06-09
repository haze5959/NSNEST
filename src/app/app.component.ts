import { Component, OnInit, Directive, ElementRef, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "./service/appService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  appTitle = "NSNEST of Ancient";

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(){
    if(this.appService.isPhone){
      this.appTitle = '';
    }
  }

  openSideUserListDialog(){
    this.router.navigate(['userList/']);
  }
}