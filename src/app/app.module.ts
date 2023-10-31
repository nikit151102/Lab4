import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarFactoryService } from './car-factory.service';
import { SedanComponent } from './TypesCars/sedan/sedan.component';
import { SportsComponent } from './TypesCars/sports/sports.component';
import { SuvComponent } from './TypesCars/suv/suv.component';

@NgModule({
  declarations: [
    AppComponent,
    SedanComponent,
    SportsComponent,
    SuvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CarFactoryService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
