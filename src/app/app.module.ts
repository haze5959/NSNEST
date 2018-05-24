import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { AgmCoreModule } from '@agm/core';
import { QuillModule } from 'ngx-quill';
import {
  MatToolbarModule, 
  MatButtonModule, 
  MatInputModule, 
  MatSidenavModule, 
  MatButtonToggleModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSnackBarModule,
  MatChipsModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppNewspeed } from './newspeed/app.newspeed';
import { AppBoard } from './board/app.board';
import { AppElbum } from './elbum/app.elbum';
import { AppTastyLoad } from './tastyLoad/app.tastyLoad';
import { AppWrite } from './write/app.write';
import { AppDetail } from './detail/app.detail';
import { AppSideUserList, ShowUserInfoDialog } from './sideUserList/app.sideUserList';
import { AppUserInfo, SetUserInfoDialog } from './userInfo/app.userInfo';
import { ShowDetailImageDialog } from './image-viewer/image-viewer.component';
import { AppService } from './service/appService';
import { HttpService } from './service/http.service';
import { AwsUtil } from './service/awsService/aws.service';
import { CognitoUtil } from './service/awsService/cognito.service';
import { UserLoginService } from './service/awsService/user-login.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNewspeed,
    AppBoard,
    AppElbum,
    AppTastyLoad,
    AppWrite,
    AppDetail,
    AppSideUserList,
    ShowUserInfoDialog,
    AppUserInfo,
    SetUserInfoDialog,
    ShowDetailImageDialog
  ],
  entryComponents: [
    ShowUserInfoDialog,
    SetUserInfoDialog,
    ShowDetailImageDialog
  ],
  imports: [
    QuillModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCN5f9NiJJoQVQncQYNQqbGcX9wdCeyvjw'
    }),
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  providers: [
    AppService,
    HttpService,
    AwsUtil,
    CognitoUtil,
    UserLoginService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
