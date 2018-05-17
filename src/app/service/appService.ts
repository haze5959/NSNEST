import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../environments/environment';

// import { user } from '../model/user';
// import { token } from '../model/token';

@Injectable()
export class AppService {
  // appUrl = environment.apiUrl;
  isAppLoading = true;  //로딩 프로그레스를 보일지말지를 관장하는 환경변수

  constructor() {
    // console.log('[appUrl] ', this.appUrl);
  }

  isTokenExpired(token: string) {
    let jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.isTokenExpired(token);
  }

  // getUserid(): string {
  //   return this.jwtHelper.decodeToken(this.getToken()).userid;
  // }
}