import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {AppSettings} from "../components/app-settings";

const apiKey = 'fake-api-key';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  getCities(page: any, size: any, search?: any): Observable<any> {
    let headers = new HttpHeaders({'X-APP-KEY': apiKey});
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    if (search && search.length > AppSettings.SEARCH_LENGTH_THRESHOLD) {
      params = params.append('search', search);
    }
    return this.http.get<any>(environment.apiUrl, {headers: headers, params: params});
  }

  updateCity(city: any): Observable<any> {
    let headers = new HttpHeaders({'X-APP-KEY': apiKey, 'Content-Type': 'application/json'});
    return this.http.put<any>(`${environment.apiUrl}/${city.id}`, city, {headers: headers});
  }

  getCity(cityId: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${cityId}`);
  }
}
