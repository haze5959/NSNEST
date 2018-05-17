import { Component, OnInit, Directive, ElementRef, Input, Output } from '@angular/core';
import { AppService } from "./service/appService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public appService: AppService) {}

  ngOnInit(){

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