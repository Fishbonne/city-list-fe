import {Component, OnInit} from '@angular/core';
import {CitiesService} from "../../services/cities.service";
import {Router} from "@angular/router";
import {LocalStorageService} from 'src/app/services/local-storage.service';
import {AppSettings} from "../app-settings";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  alternativeImageUrl: string = './assets/images/image-not-found-icon.jpg';
  localStorage: Storage;

  cities: any;
  page = 1;
  count = 0;
  size = 3;
  search: any;

  currentIndex: number = -1;
  pageSizes = [3, 6, 9];


  constructor(private citiesService: CitiesService, private router: Router, private localStorageService: LocalStorageService) {
    this.localStorage = localStorageService.localStorage
  }

  ngOnInit(): void {
    const storedPageNumber = this.localStorage.getItem('page');
    const storedCount = this.localStorage.getItem('count');
    const storedSize = this.localStorage.getItem('size');

    if (storedPageNumber) {
      this.page = parseInt(storedPageNumber);
    }
    if (storedCount) {
      this.count = parseInt(storedCount);
    }
    if (storedSize) {
      this.size = parseInt(storedSize);
    }
    window.addEventListener('beforeunload', () => {
      this.updateLocalStorage()
    });
    this.getCities();

  }

  searchCityByName(): void {
    this.page = 1;
    this.getCities();
  }

  getCities(): void {
    this.citiesService.getCities(this.page - 1, this.size, this.search || null)
      .subscribe(
        response => {
          this.cities = response.content;
          this.size = response.pageable.pageSize;
          this.count = response.totalElements;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  onTablePageChange(event: any) {
    this.page = event;
    this.getCities();
  }

  onInputChange(event: any) {
    if (event.target.value.length > AppSettings.SEARCH_LENGTH_THRESHOLD) {
      this.searchCityByName();
    } else if (event.target.value === '') {
      const storedPageNumber = this.localStorage.getItem('page');
      const storedCount = this.localStorage.getItem('count');
      const storedSize = this.localStorage.getItem('size');
      this.page = storedPageNumber ? parseInt(storedPageNumber) : 1;
      this.count = storedCount ? parseInt(storedCount) : 0;
      this.size = storedSize ? parseInt(storedSize) : 6;
      this.getCities();
    }
  }

  onImageDownloadError(event: any) {
    const image = event.target as HTMLImageElement;
    image.src = this.alternativeImageUrl;
  }

  toEditPage(city: any) {
    this.updateLocalStorage();
    this.router.navigate(['/cities', city.id])
  }

  setCurrentIndex(id: any) {
    this.currentIndex = id;
  }

  handlePageSizeChange(event: any): void {
    this.size = event.target.value;
    this.page = 1;
    this.updateLocalStorage();
    this.getCities();
  }

  handlePageNumberChange(event: any): void {
    event.preventDefault();
    this.page = event.target.value;
    this.updateLocalStorage();
    this.getCities();
  }

  private updateLocalStorage() {
    this.localStorage.setItem('page', this.page.toString());
    this.localStorage.setItem('count', this.count.toString());
    this.localStorage.setItem('size', this.size.toString());
  }
}
