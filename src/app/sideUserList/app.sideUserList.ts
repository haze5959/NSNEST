import { Component, Directive, ElementRef, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sideUserList',
  templateUrl: '/app.sideUserList.html',
  styleUrls: ['/app.sideUserList.css']
})
export class AppSideUserList {
  users = [
    {
      name: '권오규*',
      updated: new Date('1/1/16'),
      selected: false
    },
    {
      name: '권오규**',
      updated: new Date('1/17/16'),
      selected: false
    },
    {
      name: '권오규***',
      updated: new Date('1/28/16'),
      selected: false
    }
  ];
  
  pressOneUser(user){
    console.log(user);
  }
}
