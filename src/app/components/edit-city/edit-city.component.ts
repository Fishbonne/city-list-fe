import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CitiesService} from "../../services/cities.service";

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {
  currentCity?: any;
  cityId?: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private citiesService: CitiesService) {
  }

  ngOnInit(): void {
    this.cityId = this.activatedRoute.snapshot.params["id"];
    this.citiesService.getCity(this.cityId)
      .subscribe({
        next: (data) => {
          this.currentCity = data;
        },
        error: (e) => console.error(e)
      });
  }

  updateCity() {
    this.citiesService.updateCity(this.currentCity)
      .subscribe(() => {
        this.router.navigate(['/cities'])
      }, (error) => {
        if (error.status === 400) {
          alert('Bad Request: ' + error.error.message);
        } else {
          alert('An error occurred: ' + error.message);
        }
      });
  }
}
