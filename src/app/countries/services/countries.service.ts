import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByCode(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/alpha/${term}`).pipe( catchError( err => of([]) ) );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/capital/${term}`).pipe( catchError( err => of([]) ) );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/name/${term}`).pipe( catchError( err => of([]) ) );
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/region/${term}`).pipe( catchError( err => of([]) ) );
  }

}
