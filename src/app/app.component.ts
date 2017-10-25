import { Component, Directive, ElementRef, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  testEvent(event){
    console.log(event);
    alert(event.value);
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