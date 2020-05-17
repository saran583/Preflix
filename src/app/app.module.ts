import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDividerModule} from '@angular/material/divider';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { RequestComponent } from './request/request.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PlaymovieComponent } from './playmovie/playmovie.component';
import { AddnewComponent } from './addnew/addnew.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material';
import { TrailerComponent } from './trailer/trailer.component';

var firebaseConfig = {
  apiKey: "AIzaSyBjnRzcNAQXkXO-IkxFeYaY_aglGuB0cxI",
  authDomain: "preflix583.firebaseapp.com",
  databaseURL: "https://preflix583.firebaseio.com",
  projectId: "preflix583",
  storageBucket: "preflix583.appspot.com",
  messagingSenderId: "448515088496",
  appId: "1:448515088496:web:050fe10aea27fdb346d4b5",
  measurementId: "G-VCZ77BF1Q9"
};



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestComponent,
    PlaymovieComponent,
    AddnewComponent,
    TrailerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    NgxSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatDialogModule,
    AngularFirestoreModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
