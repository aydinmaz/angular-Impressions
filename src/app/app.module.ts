import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material.module';
import { HomeComponent } from './components/home/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpressionsComponent } from './components/home/impressions/impressions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImpressionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
