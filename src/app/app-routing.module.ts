import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CityListComponent} from "./components/city-list/city-list.component";
import {EditCityComponent} from "./components/edit-city/edit-city.component";

const routes: Routes = [
  {path: '', redirectTo: 'cities', pathMatch: 'full'},
  {path: 'cities', component: CityListComponent},
  {path: 'cities/:id', component: EditCityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
