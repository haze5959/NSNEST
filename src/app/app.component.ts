import { Component, OnInit, Directive, ElementRef, Input, Output } from '@angular/core';
import { AppService } from "./service/appService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  appTitle = "NSNEST of Ancient";

  constructor(public appService: AppService) {}

  ngOnInit(){
    if(this.appService.isPhone){
      this.appTitle = '';
    }
  }

  openSideUserListDialog(){
    console.log("사이드유저 다이얼로그 오픈");
  }
}



// @Directive({ selector: 'mat-button-toggle-group:not([multiple])' })
// export class matButtonToggleGroup {


//     constructor(el: ElementRef) {
      
//     }
//     testEvent(){
//       console.log("ss");
//       alert("ddd");
//     }


// }