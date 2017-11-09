import { Component, Directive, ElementRef, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sideUserList',
  templateUrl: '/app.sideUserList.html',
  styleUrls: ['/app.sideUserList.css']
})
export class AppSideUserList {
  title = 'app';
  
  testEvent(event){
    console.log(event);
    alert(event.value);
  }
}
