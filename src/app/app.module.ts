import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatFormFieldModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppNewspeed } from './newspeed/app.newspeed';
import { AppSideUserList } from './sideUserList/app.sideUserList';
import { AppUserInfo, SetUserInfoDialog, ShowDetailImageDialog } from './userInfo/app.userInfo';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNewspeed,
    AppSideUserList,
    AppUserInfo,
    SetUserInfoDialog,
    ShowDetailImageDialog,
    ImageViewerComponent
  ],
  entryComponents: [
    SetUserInfoDialog,
    ShowDetailImageDialog
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
