import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './app.write.html',
  styleUrls: ['./app.write.css']
})
export class AppWrite implements OnInit {

  classify:number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // alert(params['classify']);
      this.classify = params['classify'];
    });
  }

}
