import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterUiComponent } from './chapter-ui/chapter-ui.component';
import { HttpClientModule } from '@angular/common/http';

import { SecurityContext } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    ChapterUiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
