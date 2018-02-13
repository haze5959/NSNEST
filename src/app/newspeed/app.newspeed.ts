import { Component } from '@angular/core';

@Component({
  selector: 'app-newspeed',
  templateUrl: '/app.newspeed.html',
  styleUrls: ['/app.newspeed.css']
})
export class AppNewspeed {
  title = 'newspeed';
  onScroll ($event) {
      console.log('scrolled!!' + $event.currentScrollPosition);
  }
}
