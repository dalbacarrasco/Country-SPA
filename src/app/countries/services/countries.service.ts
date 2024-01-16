import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe( catchError( err => of([]) ) );
  }

  searchCountryByCode(term: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.url}/alpha/${term}`).pipe(
      map( (countries => countries.length > 0 ? countries[0] : null) ),
      catchError( err => of(null) ) );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/capital/${term}`);
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/name/${term}`);
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/region/${term}`);
  }

}
