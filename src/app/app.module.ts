import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CityListComponent} from './components/city-list/city-list.component';
import {FormsModule} from "@angular/forms";
import {EditCityComponent} from './components/edit-city/edit-city.component';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    EditCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
